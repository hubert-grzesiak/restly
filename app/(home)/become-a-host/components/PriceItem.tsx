import React from "react";
import {
  useFormContext,
  Controller,
  UseFieldArrayRemove,
  FieldValues,
  FieldPath,
  ControllerRenderProps,
} from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, addDays } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { IconTrash } from "@tabler/icons-react";

interface PriceItemProps {
  index: number;
  remove: UseFieldArrayRemove;
}

type FieldType = ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;

const PriceItem: React.FC<PriceItemProps> = ({ index, remove }) => {
  const { register, control } = useFormContext();
  const today = new Date();

  const handleDateChange = (date: Date | string | number, field: FieldType) => {
    if (typeof date === "string" || typeof date === "number") {
      date = new Date(date);
    }
    const adjustedDate = addDays(date, 1); // Dodajemy jeden dzień, aby skorygować problem
    field.onChange(adjustedDate.toISOString().substring(0, 10));
  };

  const renderDateButton = (field: FieldType) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          {field.value ? (
            format(parseISO(field.value), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value ? parseISO(field.value) : undefined}
          onSelect={(date) => handleDateChange(date ?? "", field)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1.5">
          <Controller
            name={`calendar.prices.${index}.from`}
            control={control}
            render={({ field }) => (
              <>
                <label>Date from</label>
                {renderDateButton(field)}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Controller
            name={`calendar.prices.${index}.to`}
            control={control}
            render={({ field }) => (
              <>
                <label>Date to</label>
                {renderDateButton(field)}
              </>
            )}
          />
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          <label>Price</label>
          <Input
            type="number"
            placeholder="Price"
            {...register(`calendar.prices.${index}.price`, {
              valueAsNumber: true,
            })}
          />
        </div>
        <button
          type="button"
          onClick={() => remove(index)}
          className="max-h-[36px] translate-x-[6px] translate-y-[20px]"
        >
          <IconTrash className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default PriceItem;
