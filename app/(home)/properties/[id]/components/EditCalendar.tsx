"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Form, FormLabel } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import PriceItem from "@/app/(home)/become-a-host/components/PriceItem";
import { Properties } from "../edit/Form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editPrices } from "@/lib/actions/host/editPrices";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { PricesSchema } from "@/app/(home)/become-a-host/components/HostForm.schema";
import { parseISO } from "date-fns";

interface Prices {
  prices: { from: string; to: string; price: number }[];
}

const EditCalendar = ({ property }: { property: Properties }) => {
  const form = useForm({
    resolver: zodResolver(PricesSchema),
    defaultValues: {
      calendar: {
        prices: property.prices.map((price) => ({
          from: price.from,
          to: price.to,
          price: price.price,
        })),
      },
    },
    shouldUnregister: false,
  });
  const {
    control,
    formState: { errors },
    watch,
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "calendar.prices",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(fields.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [fields.length, totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFields = fields.slice(indexOfFirstItem, indexOfLastItem);

  const lastItemIndex = fields.length - 1;
  const lastItemFrom = watch(`calendar.prices.${lastItemIndex}.from`);
  const lastItemTo = watch(`calendar.prices.${lastItemIndex}.to`);
  const lastItemPrice = watch(`calendar.prices.${lastItemIndex}.price`);

  const isLastItemFilled =
    lastItemFrom &&
    lastItemTo &&
    lastItemPrice !== undefined &&
    lastItemPrice !== null;

  let isDateValid = false;
  if (lastItemFrom && lastItemTo) {
    const fromDate = parseISO(lastItemFrom);
    const toDate = parseISO(lastItemTo);
    isDateValid = toDate > fromDate;
  }

  const isPriceValid = lastItemPrice > 0;

  const canAddNewItem = isLastItemFilled && isDateValid && isPriceValid;

  const onSubmit = async (data: Prices) => {
    console.log("DATA: ", data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    console.log("formData: ", formData.get("data"));

    try {
      await editPrices(property.id, formData);

      router.push(`/properties/${property.id}`);
      toast.success("Obiekt został pomyślnie zaktualizowany");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Wystąpił nieznany błąd");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("errors: ", errors);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Edit calendar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] max-w-[730px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit calendar</AlertDialogTitle>
          <AlertDialogDescription>
            Update the calendar settings below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[50vh]">
              <div className="mt-2 rounded-md border p-4">
                <FormLabel>Prices</FormLabel>
                <div className="flex flex-col gap-2">
                  {currentFields.map((field, index) => {
                    const globalIndex = indexOfFirstItem + index;
                    const itemError = errors?.calendar?.prices?.[globalIndex];
                    const isLast = globalIndex === fields.length - 1;
                    const prevToDate =
                      globalIndex > 0 ? fields[globalIndex - 1].to : null;
                    return (
                      <PriceItem
                        key={field.id}
                        remove={remove}
                        index={globalIndex}
                        error={itemError}
                        isLast={isLast}
                        prevToDate={prevToDate}
                      />
                    );
                  })}
                </div>
                {errors?.calendar?.prices?.root?.message && (
                  <p className="text-xs text-red-500">
                    {errors.calendar.prices.root.message}
                  </p>
                )}
                <Button
                  className="mt-4 self-end text-center"
                  type="button"
                  onClick={() => {
                    append({
                      from: "",
                      to: "",
                      price: 0,
                    });
                    setCurrentPage(totalPages + 1);
                  }}
                  disabled={!canAddNewItem}
                >
                  +
                </Button>
              </div>
            </ScrollArea>

            <div className="mb-4 mt-2 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Save changes</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditCalendar;
