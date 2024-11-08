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
  isEqual,
  isAfter,
  isBefore,
  parseISO,
  format,
  isWithinInterval,
  parse,
} from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { IconTrash } from "@tabler/icons-react";

interface PriceItemProps {
  index: number;
  remove: UseFieldArrayRemove;
  error: any;
  isLast: boolean;
  prevToDate: string | null;
  existingPeriods: Array<{ from: string; to: string }>;
}

type FieldType = ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;

const PriceItem: React.FC<PriceItemProps> = ({
  index,
  remove,
  error,
  isLast,
  prevToDate,
  existingPeriods,
}) => {
  const { register, control, watch } = useFormContext();
  const toDate = watch(`calendar.prices.${index}.to`);
  const fromDate = watch(`calendar.prices.${index}.from`);
  const parsedToDate = toDate ? parseISO(toDate) : null;
  const parsedFromDate = fromDate ? parseISO(fromDate) : null;
  console.log("existingPeriods", existingPeriods);
  const disablePrice =
    !parsedFromDate || !parsedToDate || isAfter(parsedFromDate, parsedToDate);

  const isDateInExistingPeriods = (date: Date) => {
    return existingPeriods.some((period) => {
      return (
        isWithinInterval(date, { start: period.from, end: period.to }) ||
        isEqual(date, period.from) ||
        isEqual(date, period.to)
      );
    });
  };
  const handleDateChange = (date: Date | null, field: FieldType) => {
    if (date) {
      field.onChange(format(date, "yyyy.MM.dd"));
    } else {
      field.onChange("");
    }
  };

  const renderDateButton = (
    field: FieldType,
    label: string,
    fieldError: any,
    disabled: boolean,
  ) => {
    const selectedDate = field.value
      ? parse(field.value, "yyyy.MM.dd", new Date())
      : null;

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs">{label}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              data-cy={label}
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal md:w-[200px]",
                !field.value && "text-muted-foreground",
                fieldError && "border-red-500",
              )}
              disabled={disabled}
            >
              {field.value ? <p>{field.value}</p> : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              data-cy={`${label}-calendar`}
              mode="single"
              selected={selectedDate}
              onSelect={(date) => handleDateChange(date, field)}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) {
                  return true;
                }
                if (isDateInExistingPeriods(date)) {
                  return true;
                }
                return false;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {fieldError && (
          <p className="mt-1 text-xs text-red-500">{fieldError.message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1 rounded-md border p-2">
      <div className="flex flex-col gap-1 md:flex-row">
        <Controller
          name={`calendar.prices.${index}.from`}
          control={control}
          render={({ field }) => {
            if (isLast) {
              let minDate = undefined;
              if (prevToDate) {
                const prevToDateParsed = parseISO(prevToDate);
                minDate = new Date(prevToDateParsed.getTime() + 86400000);
              }
              return renderDateButton(field, "Date from", error?.from, false);
            } else {
              return renderDateButton(field, "Date from", error?.from, true);
            }
          }}
        />
        <Controller
          name={`calendar.prices.${index}.to`}
          data-cy={`calendar.prices.${index}.to`}
          control={control}
          render={({ field }) => {
            if (isLast) {
              let minDate = parsedFromDate;
              return renderDateButton(
                field,
                "Date to",
                error?.to,
                false,
                minDate,
              );
            } else {
              return renderDateButton(field, "Date to", error?.to, true);
            }
          }}
        />
        <div className="flex flex-col justify-center gap-1.5">
          <label className="text-xs">Price ($USD)</label>
          <Input
            data-cy={"price"}
            type="number"
            placeholder="Price"
            disabled={disablePrice}
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
