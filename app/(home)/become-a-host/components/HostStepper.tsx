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
import { motion } from "framer-motion";
import { createObject } from "@/lib/actions/host/createObject";
import { ComboboxDemo } from "@/components/ui/combobox";
import { countries } from "@/lib/consts";
import { Select } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { TypeOf } from "zod";
import { Steps } from "antd";

import Uploader from "@/components/ui/uploader";

import Congratulation from "./Congratulation";
import PriceItem from "./PriceItem";

import {
  IconCalendar,
  IconDetails,
  IconImageInPicture,
  IconLocation,
  IconPlus,
} from "@tabler/icons-react";

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
  console.log(facilities);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      object: {
        country: "",
        city: "",
        street: "",
        name: "",
        description: "",
        numberOfBedrooms: "",
        postalCode: "",
        houseNumber: "",
        apartmentNumber: "",
        minimumStay: "",
        maximumStay: "",
        maxPeople: "",
      },
      facility: [],
      calendar: {
        checkInTime: "",
        checkOutTime: "",
        prices: [
          {
            from: "",
            to: "",
            price: 0,
          },
        ],
      },
      image: {
        description: "",
        isMain: false,
        urls: [],
      },
    },
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

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });
      formData.append("data", JSON.stringify(data));
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

  const stepsList = [
    {
      title: "Location",
      icon: <IconLocation />,
    },
    {
      title: "Details",
      icon: <IconDetails />,
    },
    {
      title: "Calendar",
      icon: <IconCalendar />,
    },
    {
      title: "Facilities",
      icon: <IconPlus />,
    },
    {
      title: "Images",
      icon: <IconImageInPicture />,
    },
  ];

  const items = stepsList.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return !isSubmitted ? (
    <>
      <h1 className="mb-8 mt-5 text-3xl font-bold tracking-tight md:text-4xl">
        Become a Host
      </h1>
      <div className="w-full rounded-xl bg-white p-4">
        <Steps items={items} current={steps} />
      </div>
      <div className="mt-12 w-full max-w-[600px] rounded-xl bg-white shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              key={steps}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
            >
              {steps === 0 && (
                <div className="flex flex-col gap-2 p-8">
                  <h2 className="text-lg font-bold">Location</h2>

                  <FormItem className="flex flex-col">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="object.country"
                        render={({ field }) => (
                          <ComboboxDemo
                            items={countries}
                            value={field.value}
                            onChange={field.onChange}
                            searchPlaceholder="country"
                            selectPlaceholder="country"
                            className="w-full"
                          />
                        )}
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
                            // control={control}
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
                        const isValid = await form.trigger("facility");
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
            </motion.div>
          </form>
        </Form>
      </div>
    </>
  ) : (
    <Congratulation />
  );
};

export default HostStepper;
