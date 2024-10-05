"use client";
import React, { useState } from "react";
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
                  {fields.map((field, index) => {
                    const itemError = errors?.calendar?.prices?.[index];
                    return (
                      <PriceItem
                        key={field.id}
                        remove={remove}
                        index={index}
                        error={itemError}
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
                  }}
                >
                  +
                </Button>
              </div>
            </ScrollArea>

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
