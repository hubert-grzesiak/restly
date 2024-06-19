"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { checkoutReservation } from "@/lib/actions/reservation/transaction.action";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Object } from "@prisma/client";

const Checkout = ({
  price,
  buyerId,
  property,
  formValues,
}: {
  price: number;
  buyerId: string;
  property: Object;
  formValues: any;
}) => {
  const { toast } = useToast();

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
  }, []);

  const onCheckout = async () => {
    const transaction = {
      price,
      buyerId,
      property,
      formValues,
    };

    await checkoutReservation(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full  bg-cover">
          Make a reservation
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
