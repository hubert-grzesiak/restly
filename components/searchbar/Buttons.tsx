import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Buttons = ({
  numberOfGuests,
  setNumberOfGuests,
  type,
}: {
  numberOfGuests: number;
  setNumberOfGuests: Dispatch<
    SetStateAction<{ adults: number; kids: number; animals: number }>
  >;
  type: "adults" | "kids" | "animals";
}) => {
  const setNumberOfGuestsByType = (type: string, value: number) => {
    setNumberOfGuests((prev) => ({ ...prev, [type]: value }));
  };
  return (
    <div className="flex w-[100px] justify-between">
      <Button
        onClick={() => setNumberOfGuestsByType(type, numberOfGuests - 1)}
        className="h-[28px] w-[28px] !p-2"
        variant={"outline"}
        disabled={numberOfGuests === 0}
      >
        <p className={cn(numberOfGuests === 0 && "text-gray-400")}>-</p>
      </Button>
      <p>{numberOfGuests}</p>
      <Button
        onClick={() => setNumberOfGuestsByType(type, numberOfGuests + 1)}
        className="h-[28px] w-[28px] !p-2"
        variant={"outline"}
      >
        +
      </Button>
    </div>
  );
};

export default Buttons;
