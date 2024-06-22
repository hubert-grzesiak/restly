import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
// import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useFormContext, useWatch } from "react-hook-form";
import { DateRangePicker } from "@nextui-org/date-picker";

const PriceItem = ({ index, remove, control }) => {
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const { register, setValue, control: formControl } = useFormContext();

  useEffect(() => {
    setValue(`calendar.prices.${index}.range.from`, dateRange.from);
    setValue(`calendar.prices.${index}.range.to`, dateRange.to);
  }, [dateRange, index, setValue]);
  console.log(dateRange);
  return (
    <>
      <Display control={formControl} index={index} />
      <FormField
        control={formControl}
        name={`calendar.prices.${index}`}
        render={() => (
          <FormItem>
            <FormControl>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="flex flex-col gap-2">
                    <FormLabel>Range</FormLabel>
                    {/* <DateRangePicker
                      initialDateFrom={dateRange.from}
                      initialDateTo={dateRange.to}
                      showCompare={false}
                      onUpdate={(values) => {
                        setDateRange(values.range);
                        setValue(
                          `calendar.prices.${index}.range.from`,
                          values.range.from,
                        );
                        setValue(
                          `calendar.prices.${index}.range.to`,
                          values.range.to,
                        );
                      }}
                      // onUpdate={(values) => console.log(values)}
                      {...register(`calendar.prices.${index}.range`)}
                    /> */}
                    <DateRangePicker
                      value={dateRange}
                      onChange={(values) => {
                        setDateRange(values);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...register(`calendar.prices.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PriceItem;

const Display = ({ control, index }) => {
  const data = useWatch({
    control,
    name: `calendar.prices.${index}`,
  });
  return (
    <div>
      <p>
        Range: {data?.range?.from} - {data?.range?.to}
      </p>
      <p>Price: {data?.price}</p>
    </div>
  );
};
