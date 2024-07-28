"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFacility, editFacility } from "@/lib/actions/admin/facilities";
import { toast } from "sonner";

const FacilitySchema = z.object({
  name: z.string().nonempty("Facility name is required"),
});

interface Props {
  type?: string;
  facilityDetails?: string;
}

const FacilityForm = ({ type, facilityDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const parsefacilityDetails =
    facilityDetails && JSON.parse(facilityDetails || "");

  const form = useForm<z.infer<typeof FacilitySchema>>({
    resolver: zodResolver(FacilitySchema),
    defaultValues: {
      name: parsefacilityDetails?.name || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof FacilitySchema>) {
    setIsSubmitting(true);
    console.log(parsefacilityDetails);
    try {
      if (type === "Edit") {
        await editFacility({
          id: parsefacilityDetails.id,
          name: values.name,
        });
        toast.success("Facility updated successfully");

        router.push(`/admin/facilities`);
      } else {
        // make an async to your API -> create a facility
        // contain all form data
        await createFacility({
          name: values.name,
        });
        toast.success("Facility created successfully");
        // navigate to home page
        router.push("/admin/facilities");
      }
    } catch (error) {
      console.error("Failed to create facility", error);
      toast.error("Failed to create facility");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you`&apos;re asking a facility to
                another person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient !text-light-900 w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "Edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "Edit" ? "Edit facility" : "Create Facility"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FacilityForm;
