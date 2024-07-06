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
import { useState, useEffect } from "react";
import { ReservationSchema } from "./ReservationFormSchema";
import { toast } from "sonner";
import { getReservations } from "@/lib/actions/reservation/getReservations";
import { useSession } from "next-auth/react";
import * as z from "zod";
// import Checkout from "@/components/Checkout";
import { Property } from "@prisma/client";
import { checkoutReservation } from "@/lib/actions/reservation/transaction.action";
import { Button } from "@/components/ui/button";
// import { result } from "lodash";

interface PropertyAdditionals extends Property {
  prices: Array<{ price: number }>;
}

const ReservationForm = ({
  propertyId,
  property,
}: {
  propertyId: string;
  property: PropertyAdditionals;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, []);

  const isDateBlocked = (
    date: Date,
    blockedDates: Array<{ from: string; to: string }>,
  ): boolean => {
    return blockedDates.some(({ from, to }) => {
      const fromDate = new Date(from.split(".").reverse().join("-"));
      const toDate = new Date(to.split(".").reverse().join("-"));
      return date >= fromDate && date <= toDate;
    });
  };

  useEffect(() => {
    const getNextAvailableDateRange = (
      blockedDates: Array<{ from: string; to: string }>,
    ) => {
      const date = new Date();
      while (isDateBlocked(date, blockedDates)) {
        date.setDate(date.getDate() + 1);
      }
      const from = date.toISOString().split("T")[0];
      date.setDate(date.getDate() + 1);
      const to = date.toISOString().split("T")[0];
      return { from, to };
    };

    async function fetchReservations() {
      const result = await getReservations(propertyId);
      if (result.success && result.reservations) {
        setBlockedDates(result.reservations);
        setDateRange(getNextAvailableDateRange(result.reservations));
      } else {
        console.error(result.message);
      }
    }

    fetchReservations();
  }, [propertyId]);

  async function onSubmit(values: z.infer<typeof ReservationSchema>) {
    setIsSubmitting(true);
    try {
      console.log(values);
      await checkoutReservation(
        property.prices[0].price || 0,
        session?.data?.user.id || "",
        property,
        values,
      );

      console.log(values);
      // if (result.success) {
      //   toast.success(result.message);
      // } else {
      //   toast.error(result.message);
      // }
    } catch (error: unknown) {
      console.error("Failed to create reservation", error);
      toast.error("Failed to create reservation.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // console.log("Checkout -> price", price, buyerId, property, formValues);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast("Reservation placed!");
    }

    if (query.get("canceled")) {
      toast("Reservation cancelled!");
    }
  }, [toast]);

  // const onCheckout = async () => {
  //   await checkoutReservation(price, buyerId, property, formValues);
  // };

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
                  <FormItem className="flex">
                    <FormLabel htmlFor="dateRange">Date Range</FormLabel>
                    <FormControl>
                      <DateRangePicker
                        initialDateFrom={dateRange.from}
                        initialDateTo={dateRange.to}
                        showCompare={false}
                        onUpdate={(values) => setDateRange(values.range)}
                        blockedDates={blockedDates} // przekazanie zablokowanych dat
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
                      {Array.from(
                        { length: parseInt(property.maxPeople) },
                        (_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1} guests
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.guests?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="mt-[20px] flex items-center justify-center">
            {/* <Checkout
              price={property.prices[0].price || 0}
              buyerId={session?.data?.user.id || ""}
              property={property}
              formValues={
                formValues || {
                  objectId: "",
                  userId: "",
                  dateFrom: "",
                  dateTo: "",
                  guests: 0,
                  dateRange: { from: "", to: "" },
                }
              }
              disabled={isSubmitting}
            /> */}
          </div>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Reserving..." : "Reserve"}
          </Button>
        </form>
      </Form>
      {/* <div className="mt-[20px] flex items-center justify-center">
        <Checkout
          price={property.prices[0].price || 0}
          buyerId={session?.data?.user.id || ""}
          property={property}
          formValues={
            formValues || {
              objectId: "",
              userId: "",
              dateFrom: "",
              dateTo: "",
              guests: 0,
              dateRange: { from: "", to: "" },
            }
          }
          disabled={isSubmitting}
        />
      </div> */}
    </>
  );
};

export default ReservationForm;
