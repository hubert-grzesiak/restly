"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { checkoutReservation } from "@/lib/actions/reservation/transaction.action";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { ReservationSchema } from "@/app/(home)/properties/[id]/components/ReservationForm/ReservationFormSchema";
import { Property } from "@prisma/client";
import * as z from "zod";

const Checkout = ({
  price,
  buyerId,
  property,
  disabled,
  formValues,
}: {
  price: number;
  buyerId: string;
  property: Property;
  disabled: boolean;
  formValues: z.infer<typeof ReservationSchema>;
}) => {
  const { toast } = useToast();

  console.log("Checkout -> price", price, buyerId, property, formValues);
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Reservation placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Reservation cancelled!",
        description: "Your reservation has been canceled.",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast]);

  const onCheckout = async () => {
    await checkoutReservation(price, buyerId, property, formValues);
  };

  return (
    <form action={onCheckout} method="POST" className="max-w-[250px]">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-cover"
          disabled={disabled}
        >
          Make a reservation
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
