"use client";

import React, { type FC, useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { DateInput } from "./date-input";
import { Label } from "./label";
import { Switch } from "./switch";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { format, eachDayOfInterval, parse } from "date-fns";

export interface DateRangePickerProps {
  onUpdate?: (values: {
    range: { from: string; to: string };
    rangeCompare?: { from: string; to: string };
  }) => void;
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  initialCompareFrom?: Date | string;
  initialCompareTo?: Date | string;
  align?: "start" | "center" | "end";
  showCompare?: boolean;
  buttonStyles?: string;
  prices?: { from: string; to: string; price: number }[];
  blockedDates?: Array<{ from: string; to: string }>;
}

const formatDateDisplay = (date: Date): string => {
  return format(date, "dd.MM.yyyy");
};

interface DateRange {
  from: string;
  to: string;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  initialDateFrom = new Date(),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "center",
  showCompare = false,
  buttonStyles,
  prices = [],
  blockedDates = [],
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: initialDateFrom,
    to: initialDateTo ? initialDateTo : initialDateFrom,
  });
  console.log("blocked dates", blockedDates);
  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: initialCompareFrom,
          to: initialCompareTo ? initialCompareTo : initialCompareFrom,
        }
      : undefined,
  );

  const openedRangeRef = useRef<DateRange | undefined>();
  const openedRangeCompareRef = useRef<DateRange | undefined>();

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false,
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetValues = (): void => {
    setRange({
      from: initialDateFrom,
      to: initialDateTo ? initialDateTo : initialDateFrom,
    });
    setRangeCompare(
      initialCompareFrom
        ? {
            from: initialCompareFrom,
            to: initialCompareTo ? initialCompareTo : initialCompareFrom,
          }
        : undefined,
    );
  };

  const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
    if (!a || !b) return a === b;
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen, range, rangeCompare]);

  const getAvailableDatesSet = (
    prices: Array<{ from: string; to: string; price: number }>,
  ): Set<number> => {
    const availableDatesSet = new Set<number>();
    prices.forEach(({ from, to }) => {
      const dates = eachDayOfInterval({ start: from, end: to });
      dates.forEach((date) => {
        availableDatesSet.add(date.getTime());
      });
    });
    return availableDatesSet;
  };
  const availableDatesSet = getAvailableDatesSet(prices);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearFromNow = new Date(today);
  oneYearFromNow.setFullYear(today.getFullYear() + 1);

  const getAllDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const dates = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const allDates = getAllDatesBetween(today, oneYearFromNow);

  const parseDate = (dateString: string): Date => {
    return parse(dateString, "dd.MM.yyyy", new Date());
  };

  const getDatesFromBlockedRanges = (
    blockedRanges: Array<{ from: string; to: string }>,
  ): Date[] => {
    const dates: Date[] = [];
    blockedRanges.forEach(({ from, to }) => {
      const start = parseDate(from);
      const end = parseDate(to);
      const intervalDates = eachDayOfInterval({ start, end });
      dates.push(...intervalDates);
    });
    return dates;
  };

  const blockedDatesArray = getDatesFromBlockedRanges(blockedDates);

  // Existing code to get disabled dates
  const disabledDatesArray = allDates.filter((date) => {
    const dateTime = date.getTime();
    const isAvailable = availableDatesSet.has(dateTime);
    return !isAvailable;
  });

  // Combine blocked dates with disabled dates
  const allDisabledDatesArray = [...disabledDatesArray, ...blockedDatesArray];

  // Create a Set for faster lookup
  const disabledDatesSet = new Set(
    allDisabledDatesArray.map((date) => date.getTime()),
  );

  // Final disabled dates array
  const finalDisabledDatesArray = allDates.filter((date) => {
    return disabledDatesSet.has(date.getTime());
  });
  console.log("disabledDatesArray", disabledDatesArray);

  // Handle date selection with max range of 14 days
  const handleSelect = (value: { from?: Date; to?: Date } | undefined) => {
    if (value?.from != null) {
      let from = value.from;
      let to = value.to || value.from;
      const diffInDays =
        Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24)) + 1;
      if (diffInDays > 14) {
        to = new Date(from);
        to.setDate(from.getDate() + 13); // 14 days total
        // Optionally, show a message to the user
      }
      setRange({ from, to });

      // Call onUpdate here
      if (onUpdate) {
        onUpdate({
          range: {
            from: formatDateDisplay(from),
            to: formatDateDisplay(to),
          },
          rangeCompare: rangeCompare
            ? {
                from: formatDateDisplay(rangeCompare.from),
                to: formatDateDisplay(rangeCompare.to!),
              }
            : undefined,
        });
      }
    }
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button size={"lg"} variant={"outline"} className={buttonStyles}>
          <div className="w-full">
            <div className="py-1 text-xs md:text-sm">
              <div>{`${formatDateDisplay(range.from)}${
                range.to != null ? " - " + formatDateDisplay(range.to) : ""
              }`}</div>
            </div>
            {rangeCompare != null && (
              <div className="-mt-1 text-xs opacity-60">
                <>
                  vs. {formatDateDisplay(rangeCompare.from)}
                  {rangeCompare.to != null
                    ? ` - ${formatDateDisplay(rangeCompare.to)}`
                    : ""}
                </>
              </div>
            )}
          </div>
          <div className="-mr-2 scale-125 pl-1 opacity-60">
            {isOpen ? (
              <ChevronUpIcon width={24} />
            ) : (
              <ChevronDownIcon width={24} />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center gap-2 px-3 pb-4 lg:flex-row lg:items-start lg:pb-0">
                {showCompare && (
                  <div className="flex items-center space-x-2 py-1 pr-4">
                    <Switch
                      defaultChecked={Boolean(rangeCompare)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          if (!range.to) {
                            setRange({
                              from: range.from,
                              to: range.from,
                            });
                          }
                          setRangeCompare({
                            from: new Date(
                              range.from.getFullYear(),
                              range.from.getMonth(),
                              range.from.getDate() - 365,
                            ),
                            to: range.to
                              ? new Date(
                                  range.to.getFullYear() - 1,
                                  range.to.getMonth(),
                                  range.to.getDate(),
                                )
                              : new Date(
                                  range.from.getFullYear() - 1,
                                  range.from.getMonth(),
                                  range.from.getDate(),
                                ),
                          });
                        } else {
                          setRangeCompare(undefined);
                        }
                      }}
                      id="compare-mode"
                    />
                    <Label htmlFor="compare-mode">Compare</Label>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <DateInput
                      value={range.from}
                      onChange={(date) => {
                        const toDate =
                          range.to == null || date > range.to ? date : range.to;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: date,
                          to: toDate,
                        }));
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range.to}
                      onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: fromDate,
                          to: date,
                        }));
                      }}
                    />
                  </div>
                  {rangeCompare != null && (
                    <div className="flex gap-2">
                      <DateInput
                        value={rangeCompare?.from}
                        onChange={(date) => {
                          if (rangeCompare) {
                            const compareToDate =
                              rangeCompare.to == null || date > rangeCompare.to
                                ? date
                                : rangeCompare.to;
                            setRangeCompare((prevRangeCompare) => ({
                              ...prevRangeCompare,
                              from: date,
                              to: compareToDate,
                            }));
                          } else {
                            setRangeCompare({
                              from: date,
                              to: new Date(),
                            });
                          }
                        }}
                      />
                      <div className="py-1">-</div>
                      <DateInput
                        value={rangeCompare?.to}
                        onChange={(date) => {
                          if (rangeCompare && rangeCompare.from) {
                            const compareFromDate =
                              date < rangeCompare.from
                                ? date
                                : rangeCompare.from;
                            setRangeCompare({
                              ...rangeCompare,
                              from: compareFromDate,
                              to: date,
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Calendar
                  mode="range"
                  onSelect={handleSelect}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  defaultMonth={new Date()}
                  prices={prices}
                  disabledDates={finalDisabledDatesArray}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4">
          <Button
            onClick={() => {
              setIsOpen(false);
              resetValues();
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              if (
                !areRangesEqual(range, openedRangeRef.current) ||
                !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
              ) {
                onUpdate?.({
                  range: {
                    from: formatDateDisplay(range.from),
                    to: formatDateDisplay(range.to!),
                  },
                  rangeCompare: rangeCompare
                    ? {
                        from: formatDateDisplay(rangeCompare.from),
                        to: formatDateDisplay(rangeCompare.to!),
                      }
                    : undefined,
                });
              }
            }}
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";
