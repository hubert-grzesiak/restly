import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker, DayContentProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  prices?: Array<{ from: string; to: string; price: number }>;
  disabledDates?: Date[];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disabledDates = [],
  prices = [], // Accept prices as a prop
  ...props
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure we are working with the start of the day

  // Helper function to find the price for a specific date
  const findPriceForDate = (date: Date) => {
    for (const priceRange of prices) {
      const fromDate = new Date(priceRange.from);
      const toDate = new Date(priceRange.to);
      if (date >= fromDate && date <= toDate) {
        return priceRange.price;
      }
    }
    return null;
  };

  // Custom component to render each day with price information
  const CustomDayContent = ({ date }: DayContentProps): JSX.Element => {
    const price = findPriceForDate(date);
    return (
      <div className="flex flex-col items-center p-1">
        <div>{date.getDate()}</div>
        {price !== null && (
          <div className="text-[8px] aria-selected:text-accent-foreground">
            {price}
          </div>
        )}
      </div>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-1 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        head: "w-full",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
        DayContent: CustomDayContent, // Use the custom day rendering component here
      }}
      disabled={[
        {
          before: today,
        },
        ...disabledDates.map((date) => ({
          from: date,
          to: date,
        })),
      ]}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
