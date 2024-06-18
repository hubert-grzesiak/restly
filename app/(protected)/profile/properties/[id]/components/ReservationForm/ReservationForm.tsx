"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
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
import { makeReservation } from "@/lib/actions/reservation/makeReservation";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { result } from "lodash";

const ReservationForm = ({ propertyId }: { propertyId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const form = useForm<z.infer<typeof ReservationSchema>>({
    resolver: zodResolver(ReservationSchema),
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

  async function onSubmit(values: z.infer<typeof ReservationSchema>) {
    setIsSubmitting(true);
    try {
      console.log(values);
      // const result = await makeReservation({
      //   objectId: propertyId,
      //   userId: session.data?.user.id as string,
      //   guests: values.guests,
      //   dateFrom: values.dateRange.from,
      //   dateTo: values.dateRange.to,
      // });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error("Failed to create reservation", error);
      toast.error("Failed to create reservation.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateRangePicker
                      initialDateFrom={dateRange.from}
                      initialDateTo={dateRange.to}
                      locale="en-GB"
                      showCompare={false}
                      onUpdate={(values) => {
                        setDateRange(values.range); // Update the dateRange state
                        field.onChange(values.range); // Call react-hook-form's onChange method
                      }}
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
                  onValueChange={(value) => field.onChange(parseInt(value))}>
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 guest</SelectItem>
                    <SelectItem value="2">2 guests</SelectItem>
                    <SelectItem value="3">3 guests</SelectItem>
                    <SelectItem value="4">4 guests</SelectItem>
                    <SelectItem value="5">5 guests</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.guests?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}>
          {isSubmitting ? "Reserving..." : "Reserve"}
        </Button>
      </form>
    </Form>
  );
};

export default ReservationForm;
