"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Checkbox, Select, Space } from "antd";
import axios from "axios";
import { UploadFile } from "antd";
import getFacilities from "@/lib/actions/host/getFacilities";
import { ComboboxDemo } from "@/components/ui/combobox";
import Uploader from "@/components/ui/uploader";
import { countries } from "@/lib/consts";
import { Textarea } from "@/components/ui/textarea";
import createObject from "@/lib/actions/host/createObject";
import { motion } from "framer-motion";
import Congratulation from "./Congratulation";

const HostStepper = () => {
  const [steps, setSteps] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [facilities, setFacilities] = useState<
    { value: string; label: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
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
        prices: [],
      },
      image: {
        description: "",
        isMain: false,
        urls: [],
      },
    },
  });

  useEffect(() => {
    const fetchFacilities = async () => {
      const facilitiesData = await getFacilities();
      if (facilitiesData) {
        setFacilities(facilitiesData);
      }
    };
    fetchFacilities();
  }, []);

  const handleFilesChange = async (newFiles: UploadFile[]) => {
    const uploadedUrls: string[] = [];
    for (const file of newFiles) {
      const formData = new FormData();
      formData.append("file", file.originFileObj as Blob);
      formData.append("upload_preset", "restly");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dev6yhoh3/image/upload",
          formData
        );
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }
    form.setValue("image.urls", uploadedUrls);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const formData = { ...data };

      formData.facility = formData.facility.map((facility) => ({
        name: facility.name,
      }));

      if (formData.facility.some((facility) => !facility.name)) {
        throw new Error("All facilities must have names.");
      }

      toast.success(JSON.stringify(formData, null, 2));
      console.log("FormData: ", formData);
      // await createObject(formData);
      toast.success("Object created successfully");
    } catch (error) {
      toast.error(
        (error as Error).message || "Failed to upload files. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentMonth = new Date().getMonth();

  const [facilityValue, setFacilityValue] = useState<string[]>([]);

  return !isSubmitted ? (
    <>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        Become a Host
      </h1>
      <div className="bg-white w-full max-w-[500px] rounded-xl shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              key={steps}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}>
              {steps === 0 && (
                <div className="p-8 gap-2 flex flex-col">
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
                  <div className="w-full flex justify-end flex-row">
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
                      className="mt-4 text-center max-w-[320px]">
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 1 && (
                <div className="p-8 gap-2 flex flex-col">
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
                  <div className="w-full flex justify-between flex-row">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      className="mt-4 text-center max-w-[320px]">
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
                      className="mt-4 text-center max-w-[320px]">
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 2 && (
                <div className="shadow-lg rounded-xl p-8">
                  <h2 className="text-lg font-bold">Calendar</h2>

                  <FormField
                    control={form.control}
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
                  <FormField
                    control={form.control}
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
                  <FormField
                    control={form.control}
                    name="calendar.prices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prices by Month</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-4">
                            {[...Array(12).keys()]
                              .filter((month) => month >= currentMonth)
                              .map((month) => (
                                <div
                                  key={month}
                                  className="flex flex-col gap-4">
                                  <span>
                                    {new Date(0, month).toLocaleString(
                                      "default",
                                      {
                                        month: "long",
                                      }
                                    )}
                                  </span>
                                  <Input
                                    type="number"
                                    placeholder={`Price for ${new Date(
                                      0,
                                      month
                                    ).toLocaleString("default", {
                                      month: "long",
                                    })}`}
                                    value={
                                      Array.isArray(field.value)
                                        ? field.value.find(
                                            (c) => c.month === month + 1
                                          )?.dailyRate || ""
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const updatedPrices = Array.isArray(
                                        field.value
                                      )
                                        ? [...field.value]
                                        : [];
                                      const index = updatedPrices.findIndex(
                                        (c) => c.month === month + 1
                                      );
                                      if (index !== -1) {
                                        updatedPrices[index].dailyRate =
                                          parseFloat(e.target.value);
                                      } else {
                                        updatedPrices.push({
                                          year: new Date().getFullYear(),
                                          month: month + 1,
                                          dailyRate: parseFloat(e.target.value),
                                        });
                                      }
                                      field.onChange(updatedPrices);
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-between flex-row">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      className="mt-4 text-center max-w-[320px]">
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
                      className="mt-4 text-center max-w-[320px]">
                      Next step
                    </Button>
                  </div>
                </div>
              )}

              {steps === 3 && (
                <div className="p-8 gap-2 flex flex-col">
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
                            options={facilities}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-between flex-row">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      className="mt-4 text-center max-w-[320px]">
                      Prev step
                    </Button>
                    <Button
                      onClick={() => setSteps(steps + 1)}
                      className="mt-4 text-center max-w-[320px]">
                      Next step
                    </Button>
                  </div>
                </div>
              )}
              {steps === 4 && (
                <div className="p-8 gap-2 flex flex-col">
                  <h2 className="text-lg font-bold">Images</h2>
                  <FormField
                    control={form.control}
                    name="image.urls"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Uploader onFilesChange={handleFilesChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image.isMain"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}>
                            Is Main Image
                          </Checkbox>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-between flex-row">
                    <Button
                      onClick={() => setSteps(steps - 1)}
                      className="mt-4 text-center max-w-[320px]">
                      Prev step
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => setIsSubmitted(true)}
                      className="mt-4 text-center max-w-[320px] outline-green-500 border-green-500 text-green-700"
                      variant={"outline"}>
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
