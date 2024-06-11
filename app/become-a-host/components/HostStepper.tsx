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
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [facilities, setFacilities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      obiekt: {
        kraj: "",
        miejscowosc: "",
        ulica: "",
        nazwa: "",
        opis: "",
        liczba_sypialni: 0,
        kod_pocztowy: "",
        numer_domu: "",
        numer_mieszkania: "",
        minimalny_czas_pobytu: 0,
        maksymalny_czas_pobytu: 0,
        maksymalna_ilosc_osob: 1,
      },
      udoqodnienie: {
        nazwa: "",
      },
      kalendarz: {
        data_od: "",
        data_do: "",
        godzina_zameldowania: "",
        godzina_wymeldowania: "",
        ceny: [],
      },
      zdjecie: {
        opis: "",
        czy_glowne: false,
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

  console.log(facilities);
  const handleFilesChange = (newFiles: UploadFile[]) => {
    setFiles(newFiles);
  };

  const uploadFilesToCloudinary = async () => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
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
    return uploadedUrls;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    try {
      const uploadedUrls = await uploadFilesToCloudinary();
      // Add the uploaded URLs to the form data
      const formData = {
        ...data,
        zdjecie: {
          ...data.zdjecie,
          urls: uploadedUrls,
        },
      };

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
      await createObject({
        ...formData,
      });
      toast({ title: "Obiect created successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const currentMonth = new Date().getMonth();
  return (
    <div className="bg-white w-full max-w-[500px] rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {steps === 0 && (
            <div className="p-8 gap-2 flex flex-col">
              <h2 className="text-lg font-bold">Lokalizacja</h2>

              <FormItem className="flex flex-col">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="obiekt.kraj"
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
                name="obiekt.miejscowosc"
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
                name="obiekt.ulica"
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
                name="obiekt.kod_pocztowy"
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
                name="obiekt.numer_domu"
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
                name="obiekt.numer_mieszkania"
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
                  onClick={() => setSteps(steps + 1)}
                  className="mt-4 text-center max-w-[320px]">
                  Next step
                </Button>
              </div>
            </div>
          )}
          {steps === 1 && (
            <div className="p-8 gap-2 flex flex-col">
              <h2 className="text-lg font-bold">Szczegóły</h2>

              <FormField
                control={form.control}
                name="obiekt.nazwa"
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
                name="obiekt.opis"
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
                name="obiekt.liczba_sypialni"
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
                name="obiekt.minimalny_czas_pobytu"
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
                name="obiekt.maksymalny_czas_pobytu"
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
                name="obiekt.maksymalna_ilosc_osob"
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
                  onClick={() => setSteps(steps + 1)}
                  className="mt-4 text-center max-w-[320px]">
                  Next step
                </Button>
              </div>
            </div>
          )}
          {steps === 2 && (
            <div className="shadow-lg rounded-xl p-8">
              <h2 className="text-lg font-bold">Kalendarz</h2>

              <FormField
                control={form.control}
                name="kalendarz.godzina_zameldowania"
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
                name="kalendarz.godzina_wymeldowania"
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
                name="kalendarz.ceny"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ceny za miesiąc</FormLabel>
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
                                placeholder={`Cena za ${new Date(
                                  0,
                                  month
                                ).toLocaleString("default", {
                                  month: "long",
                                })}`}
                                value={
                                  Array.isArray(field.value)
                                    ? field.value.find(
                                        (c) => c.miesiac === month + 1
                                      )?.cena_za_dobe || ""
                                    : ""
                                }
                                onChange={(e) => {
                                  const updatedCeny = Array.isArray(field.value)
                                    ? [...field.value]
                                    : [];
                                  const index = updatedCeny.findIndex(
                                    (c) => c.miesiac === month + 1
                                  );
                                  if (index !== -1) {
                                    updatedCeny[index].cena_za_dobe =
                                      parseFloat(e.target.value);
                                  } else {
                                    updatedCeny.push({
                                      rok: new Date().getFullYear(),
                                      miesiac: month + 1,
                                      cena_za_dobe: parseFloat(e.target.value),
                                    });
                                  }
                                  field.onChange(updatedCeny);
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
                  onClick={() => setSteps(steps + 1)}
                  className="mt-4 text-center max-w-[320px]">
                  Next step
                </Button>
              </div>
            </div>
          )}

          {steps === 3 && (
            <div className="p-8 gap-2 flex flex-col">
              <h2 className="text-lg font-bold">Udogodnienia</h2>
              <FormItem className="flex flex-col">
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="udogodnienie"
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
                          options={facilities}
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
              <h2 className="text-lg font-bold">Zdjęcia</h2>
              <FormField
                control={form.control}
                name="zdjecie.czy_glowne"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Uploader onFilesChange={handleFilesChange} />
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
