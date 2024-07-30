"use client";

import React, { useState } from "react";
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
import { FormSchema } from "@/app/(home)/become-a-host/components/HostForm.schema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxDemo } from "@/components/ui/combobox";
import { countries } from "@/lib/consts";
import { Select } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { TypeOf } from "zod";

import Uploader from "@/components/ui/uploader";

import PriceItem from "@/app/(home)/become-a-host/components/PriceItem";

import { cn } from "@/lib/utils";
import Stepper from "@/components/Stepper";
import { Property } from "@prisma/client";
import { editObject } from "@/lib/actions/host/editObject";
import { useRouter } from "next/navigation";

type FormSchemaType = TypeOf<typeof FormSchema>;

interface Properties extends Property {
  facility: { id: string; name: string }[];
  urls: string[];
  prices: { from: string; to: string; price: number }[];
}

const EditForm = ({
  property,
  facilities,
}: {
  property: Properties;
  facilities: { label: string; value: string }[];
}) => {
  const router = useRouter();
  const [steps, setSteps] = useState<number>(0);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [facilityValue, setFacilityValue] = useState<string[]>(
    property.facility.map((facility) => facility.name),
  );

  const form = useForm<FormSchemaType>({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      object: {
        country: property.country,
        city: property.city,
        street: property.street,
        postalCode: property.postalCode,
        houseNumber: property.houseNumber,
        apartmentNumber: property.apartmentNumber,
        name: property.name,
        description: property.description,
        numberOfBedrooms: property.numberOfBedrooms,
        minimumStay: property.minimumStay,
        maximumStay: property.maximumStay,
        maxPeople: property.maxPeople,
      },
      calendar: {
        checkInTime: property.checkInTime ?? "",
        checkOutTime: property.checkOutTime ?? "",
        prices: property.prices.map((price) => ({
          from: price.from,
          to: price.to,
          price: price.price,
        })),
      },
      facility: property.facility.map((facility) => ({
        name: facility.name,
      })),
      image: {
        urls: property.urls.map((url) => url),
      },
    },
  });
  const {
    control,
    formState: { errors },
    register,
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "calendar.prices",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const onFilesChange = (newFiles: UploadFile[]) => {
    setFiles(newFiles);
    console.log("FILES: ", newFiles);
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });
      console.log("FORM DATA: ", formData.getAll("files"));

      formData.append("data", JSON.stringify(data));
      console.log(
        "files.urls",
        files.map((file) => file.url),
      );
      const filesUrls = files ? files.map((file) => file.url) : [];
      console.log("FILES URLS: ", filesUrls);
      await editObject(property.id, formData, filesUrls);
      router.push(`/properties/${property.id}`);
      toast.success("Object edited successfully");
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

  return (
    <>
      <h1 className="mb-8 mt-5 text-3xl font-bold tracking-tight md:text-4xl">
        Edit the property
      </h1>
      <div className="w-full rounded-xl bg-white p-4">
        <Stepper steps={steps} />
      </div>
      <div className="mt-12 w-full max-w-[600px] rounded-xl bg-white shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div key={steps}>
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

                  <FormItem>
                    <FormLabel>Maximum Number of People</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...register("object.maxPeople", {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => setSteps(steps - 1)}
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
              {steps === 2 && (
                <div className="rounded-xl p-8 shadow-lg">
                  <h2 className="text-lg font-bold">Calendar</h2>

                  <Controller
                    control={control}
                    name="calendar.checkInTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Controller
                    control={control}
                    name="calendar.checkOutTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-[10px] rounded-md border p-4">
                    <FormLabel>Prices by Month</FormLabel>
                    <div className="flex flex-col gap-2">
                      {fields.map((field, index) => {
                        return (
                          <PriceItem
                            key={field.id}
                            remove={remove}
                            index={index}
                          />
                        );
                      })}
                    </div>
                    <p>{errors?.calendar?.prices?.root?.message}</p>
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
                            defaultValue={facilityValue}
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
                      className="mt-4 max-w-[320px] text-center"
                    >
                      Prev step
                    </Button>
                    <Button
                      onClick={async () => {
                        // const isValid = await form.trigger("facility");
                        // if (isValid) {
                        setSteps(steps + 1);
                        // }
                      }}
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
                          <Uploader
                            onFilesChange={onFilesChange}
                            defaultFiles={property.urls}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full flex-row justify-between">
                    <Button
                      onClick={() => setSteps(steps - 1)}
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
  );
};

export default EditForm;
