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
  error: any;
}

type FieldType = ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;

const PriceItem: React.FC<PriceItemProps> = ({ index, remove, error }) => {
  const { register, control } = useFormContext();

  const handleDateChange = (date: Date | string | number, field: FieldType) => {
    if (typeof date === "string" || typeof date === "number") {
      date = new Date(date);
    }
    const adjustedDate = addDays(date, 1);
    field.onChange(adjustedDate.toISOString().substring(0, 10));
  };

  const renderDateButton = (
    field: FieldType,
    label: string,
    fieldError: any,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal md:w-[200px]",
              !field.value && "text-muted-foreground",
              fieldError && "border-red-500",
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
      {fieldError && (
        <p className="mt-1 text-xs text-red-500">{fieldError.message}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-1 rounded-md border p-2">
      <div className="flex flex-col gap-1 md:flex-row">
        <Controller
          name={`calendar.prices.${index}.from`}
          control={control}
          render={({ field }) =>
            renderDateButton(field, "Date from", error?.from)
          }
        />
        <Controller
          name={`calendar.prices.${index}.to`}
          control={control}
          render={({ field }) => renderDateButton(field, "Date to", error?.to)}
        />
        <div className="flex flex-col justify-center gap-1.5">
          <label className="text-xs">Price</label>
          <Input
            type="number"
            placeholder="Price"
            {...register(`calendar.prices.${index}.price`, {
              valueAsNumber: true,
            })}
            className={cn(error?.price && "border-red-500")}
          />
          {error?.price && (
            <p className="mt-1 text-xs text-red-500">{error.price.message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => remove(index)}
          className="mt-2 max-h-[36px] self-end md:mt-0 md:translate-x-[6px] md:translate-y-[20px] md:self-auto"
        >
          <IconTrash className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default PriceItem;
