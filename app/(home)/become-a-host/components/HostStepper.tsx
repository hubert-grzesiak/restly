"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FormSchema } from "./HostForm.schema";
import getFacilities from "@/lib/actions/host/getFacilities";
import { Textarea } from "@/components/ui/textarea";
import { createObject } from "@/lib/actions/host/createObject";
import { ComboboxDemo } from "@/components/ui/combobox";
import { countries } from "@/lib/consts";
import { Select } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { TypeOf } from "zod";

import Uploader from "@/components/ui/uploader";

import Congratulation from "./Congratulation";
import PriceItem from "./PriceItem";

import { cn } from "@/lib/utils";
import Stepper from "@/components/Stepper";

type FormSchemaType = TypeOf<typeof FormSchema>;

const HostStepper: React.FC = () => {
  const [steps, setSteps] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<
    { label: string; value: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [facilityValue, setFacilityValue] = useState<string[]>([]);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      object: {
        country: "",
        city: "",
        street: "",
        name: "",
        description: "",
        numberOfBedrooms: 0,
        postalCode: "",
        houseNumber: "",
        apartmentNumber: "",
        minimumStay: 0,
        maximumStay: 0,
        maxPeople: 0,
      },
      facility: [],
      calendar: {
        checkInTime: "15:00",
        checkOutTime: "11:00",
        prices: [
          {
            from: "",
            to: "",
            price: 0,
          },
        ],
      },
      image: {
        isMain: false,
        urls: [],
      },
    },
  });

  const {
    control,
    formState: { errors },
    register,
    watch,
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "calendar.prices",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  useEffect(() => {
    const fetchFacilities = async () => {
      const facilitiesData = await getFacilities();
      console.log(facilitiesData);
      if (facilitiesData) {
        setFacilities(facilitiesData);
      }
    };
    fetchFacilities();
  }, []);

  const onFilesChange = (newFiles: UploadFile[]) => {
    setFiles(newFiles);
  };

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
    isDateValid = lastItemTo >= lastItemFrom;
  }
  console.log("fields", fields);

  const isPriceValid = lastItemPrice > 0;

  const canAddNewItem =
    (isLastItemFilled && isDateValid && isPriceValid) || fields.length === 0;

  const onSubmit = async (data: FormSchemaType) => {
    console.log("FORM DATA: ", data);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });
      formData.append("data", JSON.stringify(data));
      console.log("FORM DATA: ", formData);
      await createObject(formData);

      toast.success("Object created successfully");
      setIsSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return !isSubmitted ? (
    <>
      <h1 className="mb-8 mt-5 text-3xl font-bold tracking-tight md:text-4xl">
        Become a Host
      </h1>
      <div className="w-full rounded-xl bg-white p-4">
        <Stepper steps={steps} />
      </div>
      <div className="mt-12 w-full max-w-[700px] rounded-xl bg-white shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {steps === 0 && (
                <div className="flex flex-col gap-2 p-8">
                  <h2 className="text-lg font-bold">Location</h2>

                  <FormItem className="flex flex-col">
                    <FormLabel
                      className={cn(
                        "text-sm font-medium",
                        errors.object?.country && "text-red-500",
                      )}
                    >
                      Country
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="object.country"
                        render={({ field }) => {
                          return (
                            <>
                              <ComboboxDemo
                                items={countries}
                                value={field.value}
                                onChange={field.onChange}
                                searchPlaceholder="country"
                                selectPlaceholder="country"
                                className="w-full"
                              />
                              {errors.object?.country && (
                                <p className="text-[12.8px] text-sm font-medium text-red-500">
                                  {errors.object?.country.message}
                                </p>
                              )}
                            </>
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="object.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="object.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="object.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="object.houseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="object.apartmentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full flex-row justify-end">
                    <Button
                      onClick={async () => {
                        const isValid = await form.trigger([
                          "object.country",
                          "object.city",
                          "object.street",
                          "object.postalCode",
                          "object.houseNumber",
                          "object.apartmentNumber",
                        ]);
                        if (isValid) {
                          setSteps(steps + 1);
                        }
                      }}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 1 && (
                <div className="flex flex-col gap-2 p-8">
                  <h2 className="text-lg font-bold">Details</h2>

                  <FormField
                    control={form.control}
                    name="object.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="object.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="object.numberOfBedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="object.minimumStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Stay Duration</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="object.maximumStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Stay Duration</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="object.maxPeople"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Number of People</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Prev step
                    </Button>
                    <Button
                      onClick={async () => {
                        const isValid = await form.trigger([
                          "object.name",
                          "object.description",
                          "object.numberOfBedrooms",
                          "object.minimumStay",
                          "object.maximumStay",
                          "object.maxPeople",
                        ]);
                        if (isValid) {
                          setSteps(steps + 1);
                        }
                      }}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 2 && (
                <div className="rounded-xl p-8 shadow-lg">
                  <h2 className="text-lg font-bold">Calendar</h2>

                  <div className="mt-[10px] rounded-md border p-4">
                    <FormLabel>Prices by Month</FormLabel>
                    <div className="flex flex-col gap-2">
                      {currentFields.map((field, index) => {
                        const globalIndex = indexOfFirstItem + index;
                        const itemError =
                          errors?.calendar?.prices?.[globalIndex];
                        const isLast = globalIndex === fields.length - 1;
                        const prevToDate =
                          globalIndex > 0 ? fields[globalIndex - 1].to : null;
                        const existingPeriods = fields
                          .filter((_, i) => i !== globalIndex)
                          .map((item) => ({
                            from: item.from,
                            to: item.to,
                          }));
                        return (
                          <PriceItem
                            key={field.id}
                            remove={remove}
                            index={globalIndex}
                            error={itemError}
                            isLast={isLast}
                            prevToDate={prevToDate}
                            existingPeriods={existingPeriods}
                          />
                        );
                      })}
                    </div>
                    {errors?.calendar?.prices?.prices?.message && (
                      <p className="text-xs text-red-500">
                        {errors?.calendar?.prices?.prices?.message}
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

                  <div className="mb-4 mt-2 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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

                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => {
                        form.trigger("calendar.prices");
                        setSteps(steps - 1);
                      }}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Prev step
                    </Button>
                    <Button
                      type="button"
                      onClick={async () => {
                        const isValid = await form.trigger([
                          "calendar.checkInTime",
                          "calendar.checkOutTime",
                          "calendar.prices",
                        ]);
                        if (isValid) {
                          setSteps(steps + 1);
                        }
                      }}
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 3 && (
                <div className="flex flex-col gap-2 p-8">
                  <h2 className="text-lg font-bold">Facilities</h2>
                  <FormField
                    control={form.control}
                    name="facility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <FormControl>
                          <Select
                            mode="multiple"
                            allowClear
                            value={facilityValue}
                            onChange={(value) => {
                              setFacilityValue(value);
                              field.onChange(value.map((name) => ({ name })));
                            }}
                            filterOption
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            options={facilities.map((facility) => ({
                              label: facility.label,
                              value: facility.value,
                            }))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Prev step
                    </Button>
                    <Button
                      onClick={async () => {
                        const isValid = await form.trigger("facility");
                        if (isValid) {
                          setSteps(steps + 1);
                        }
                      }}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Next step
                    </Button>
                  </div>
                </div>
              )}

              {steps === 4 && (
                <div className="flex flex-col gap-2 p-8">
                  <h2 className="text-lg font-bold">Images</h2>
                  <FormField
                    control={form.control}
                    name="image.urls"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Uploader onFilesChange={onFilesChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      type="button"
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Prev step
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 max-w-[320px] border-green-500 text-center text-green-700 outline-green-500"
                      variant={"outline"}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  ) : (
    <Congratulation />
  );
};

export default HostStepper;
