"use client";

import React, { useState } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateStatusOfReview } from "@/lib/actions/admin/reportedReviews";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const ReviewStatusSchema = z.object({
  status: z.enum(["Pending", "ok"], {
    required_error: "You need to select a review status.",
  }),
});

interface ReviewForm {
  id: string;
  status: string;
}

interface Props {
  review: ReviewForm;
}

const EditReviewStatus = ({ review }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "";
  console.log("userId", userId);
  const form = useForm<z.infer<typeof ReviewStatusSchema>>({
    resolver: zodResolver(ReviewStatusSchema),
    defaultValues: {
      status: "Pending",
    },
  });

  async function onSubmit(values: z.infer<typeof ReviewStatusSchema>) {
    setIsSubmitting(true);
    try {
      await updateStatusOfReview({
        id: review.id,
        status: values.status,
        userId,
      });
      toast.success("Review status updated successfully");
      router.push(`/admin/reported-reviews`);
    } catch (error) {
      console.error("Failed to update review status", error);
      toast.error("Failed to update review status");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between gap-10"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set the review status</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem value="Pending" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Pending <ClockIcon className="h-4 w-4" />
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem value="ok" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Ok <CheckIcon className="h-4 w-4" />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 self-end">
          <Link
            href="/admin/reported-reviews"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Edit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditReviewStatus;
