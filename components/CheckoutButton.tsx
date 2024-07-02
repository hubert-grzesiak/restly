"use client";

import { Button } from "@/components/ui/button";

const CheckoutButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      type="submit"
      className="w-full rounded-full bg-cover"
      disabled={disabled}
    >
      Make a reservation
    </Button>
  );
};

export default CheckoutButton;
