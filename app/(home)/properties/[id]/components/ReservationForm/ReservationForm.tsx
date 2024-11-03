"use client";

import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { loadStripe } from "@stripe/stripe-js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState, useEffect, Suspense } from "react";
import { ReservationSchema } from "./ReservationFormSchema";
import { toast } from "sonner";
import { getReservations } from "@/lib/actions/reservation/getReservations";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { Property } from "@prisma/client";
import { checkoutReservation } from "@/lib/actions/reservation/transaction.action";
import { Button } from "@/components/ui/button";
import { getPricesForPropertyCalendar } from "@/lib/actions/reservation/getPricesForPropertyCalendar";
import { differenceInCalendarDays } from "date-fns";

interface PropertyAdditionals extends Property {
  prices: { from: string; to: string; price: number }[];
}

const ReservationForm = ({
  propertyId,
  property,
}: {
  propertyId: string;
  property: PropertyAdditionals;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prices, setPrices] = useState(property.prices);
  const session = useSession();
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });
  const [blockedDates, setBlockedDates] = useState<
    Array<{ from: string; to: string }>
  >([]);
  const form = useForm<z.infer<typeof ReservationSchema>>({
    // resolver: zodResolver(ReservationSchema),
    defaultValues: {
      objectId: propertyId,
      userId: session.data?.user.id as string,
      dateRange: dateRange,
      guests: 1,
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    setValue("dateRange", dateRange);
  }, [dateRange, setValue]);

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast("Reservation placed!");
    }

    if (query.get("canceled")) {
      toast("Reservation cancelled!");
    }
  }, []);

  const convertDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const getNextAvailableDateRange = (
      blockedDates: Array<{ from: string; to: string }>,
    ) => {
      const date = new Date();

      const from = date.toISOString().split("T")[0];
      date.setDate(date.getDate() + 1);
      const to = date.toISOString().split("T")[0];
      return { from, to };
    };

    async function fetchReservations() {
      const result = await getReservations(propertyId);
      if (result.success && result.reservations) {
        // Filter out null values from reservations
        const validReservations = result.reservations.filter(
          (reservation): reservation is { from: string; to: string } =>
            reservation !== null,
        );
        setBlockedDates(validReservations);
        setDateRange(getNextAvailableDateRange(validReservations));
      } else {
        console.error(result.message);
      }
    }

    async function fetchPrices() {
      const result = await getPricesForPropertyCalendar(propertyId);
      if (result.success && result.prices) {
        setPrices(result.prices);
      } else {
        console.error(result.message);
      }
    }

    fetchPrices();
    fetchReservations();
  }, [propertyId]);

  const calculateTotalDays = (from: Date, to: Date): number => {
    const totalDays = differenceInCalendarDays(to, from);
    return totalDays;
  };

  const calculateTotalPrice = (
    from: Date,
    to: Date,
    prices: Array<{ from: string; to: string; price: number }>,
  ): number => {
    let totalPrice = 0;
    const dateFrom = new Date(from);
    const dateTo = new Date(to);

    prices.forEach(({ from: priceFromStr, to: priceToStr, price }) => {
      const priceFrom = new Date(priceFromStr);
      const priceTo = new Date(priceToStr);

      if (dateFrom <= priceTo && dateTo >= priceFrom) {
        const effectiveFrom = dateFrom >= priceFrom ? dateFrom : priceFrom;
        const effectiveTo = dateTo <= priceTo ? dateTo : priceTo;
        const days = calculateTotalDays(effectiveFrom, effectiveTo);
        totalPrice += days * price;
      }
    });

    return totalPrice;
  };

  const newFromDate = new Date(convertDate(dateRange.from));
  const newToDate = new Date(convertDate(dateRange.to));

  const totalDays = calculateTotalDays(newFromDate, newToDate);
  const calculatedPrice = calculateTotalPrice(newFromDate, newToDate, prices);
  const totalPrice = calculatedPrice * 1.05;

  async function onSubmit(values: z.infer<typeof ReservationSchema>) {
    setIsSubmitting(true);
    try {
      await checkoutReservation(
        totalPrice || 0,
        session?.data?.user.id || "",
        property,
        values,
      );
    } catch (error: unknown) {
      console.error("Failed to create reservation", error);
      toast.error("Failed to create reservation.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-[10px]"
        >
          <div className="w-full">
            <div className="flex w-full flex-col gap-2">
              <FormField
                control={form.control}
                name="dateRange"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor="dateRange">Date Range</FormLabel>
                    <FormControl>
                      <DateRangePicker
                        onUpdate={(values) => {
                          setDateRange(values.range);
                          console.log(values.range);
                        }}
                        blockedDates={blockedDates}
                        prices={prices}
                        buttonStyles="h-[36px] text-left pl-3 pr-4"
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.dateRange?.from?.message ||
                        errors.dateRange?.to?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="guests">Guests</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(parseInt(value));
                    }}
                  >
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: property.maxPeople }, (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1} guests
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.guests?.message}</FormMessage>
              </FormItem>
            )}
          />
          {
            <Suspense fallback={<h2>🌀 Loading...</h2>}>
              <div className="mb-2 mt-4 flex flex-col gap-2 border-b-1 border-t-1 pb-4 pt-4">
                <div className="flex justify-between">
                  <span>Number of days:</span>
                  <span>{totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>{calculatedPrice ? `$${calculatedPrice}` : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee:</span>
                  <span>
                    {totalPrice
                      ? `$${(calculatedPrice * 0.05).toFixed(2)}`
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pb-4">
                <span>Total: </span>
                <span className="font-bold">
                  {totalPrice ? `$${totalPrice.toFixed(2)}` : "-"}
                </span>
              </div>
            </Suspense>
          }

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              property.softDeleted ||
              isSubmitting ||
              property.ownerId === session.data?.user.id
            }
          >
            {property.softDeleted
              ? "This property is no longer available"
              : property.ownerId === session.data?.user.id
                ? "It's your property!"
                : isSubmitting
                  ? "Reserving..."
                  : "Reserve"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ReservationForm;
