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
import { toast } from "@/components/ui/use-toast";
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

const HostStepper = () => {
  const [steps, setSteps] = useState(0);
  const [facilities, setFacilities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
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
        endDate: "",
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
      formData.append("upload_preset", "restly"); // Replace with your upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dev6yhoh3/image/upload", // Replace with your Cloudinary URL
          formData
        );
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }
    // Set the uploaded URLs in the form state
    form.setValue("image.urls", uploadedUrls);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    try {
      const formData = { ...data };

      // Check if all facilities have names
      if (formData.facility.some((facility) => !facility.name)) {
        throw new Error("All facilities must have names.");
      }

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        ),
      });
      console.log("FormData: ", formData);
      await createObject(formData);
      toast({ title: "Object created successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to upload files. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentMonth = new Date().getMonth();

  return (
    <div className="bg-white w-full max-w-[500px] rounded-xl shadow-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          action="#"
          method="post"
          onSubmitCapture={(e) => e.preventDefault()} // Prevent default form submission
        >
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
                            <div key={month} className="flex flex-col gap-4">
                              <span>
                                {new Date(0, month).toLocaleString("default", {
                                  month: "long",
                                })}
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
                                    updatedPrices[index].dailyRate = parseFloat(
                                      e.target.value
                                    );
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
              <FormItem className="flex flex-col">
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="facility"
                    render={({ field }) => (
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          mode="multiple"
                          allowClear
                          filterOption
                          value={field.value}
                          optionLabelProp="label"
                          defaultValue={[]}
                          onChange={field.onChange}
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          options={facilities.map((facility) => ({
                            label: facility.name,
                            value: facility.id,
                          }))}
                        />
                      </Space>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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
                      <Checkbox checked={field.value} onChange={field.onChange}>
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
                  className="mt-4 text-center max-w-[320px] outline-green-500 border-green-500 text-green-700"
                  variant={"outline"}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default HostStepper;
