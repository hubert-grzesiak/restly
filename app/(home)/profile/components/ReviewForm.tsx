"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
// import { createReview, editReview } from "@/lib/actions/admin";
import { toast } from "sonner";
import { Rate } from "antd";
import { Textarea } from "@/components/ui/textarea";

const ReviewSchema = z.object({
  review: z.string().nonempty("Review is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
});

interface Props {
  type?: string;
  reviewDetails?: string;
  id?: string;
}

const ReviewForm = ({ type, reviewDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0); // Default rating value
  const router = useRouter();

  const parsereviewDetails = reviewDetails && JSON.parse(reviewDetails || "");

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: parsereviewDetails?.review || "",
      rating: parsereviewDetails?.rating || 0,
    },
  });
  const { register, setValue } = form;

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue("rating", value); // Update the form value for rating
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ReviewSchema>) {
    setIsSubmitting(true);
    console.log(parsereviewDetails);
    try {
      if (type === "Edit") {
        // await editReview({
        //   id: parsereviewDetails.id,
        //   review: values.review,
        //   rating: values.rating,
        // });
        console.log(values);
        toast.success("Review updated successfully");

        router.push(`/admin/reviews`);
      } else {
        // make an async to your API -> create a review
        // contain all form data
        // await createReview({
        //   review: values.review,
        //   rating: values.rating,
        // });
        toast.success("Review created successfully");
        // navigate to home page
        router.push("/admin/reviews");
      }
    } catch (error) {
      console.error("Failed to create review", error);
      toast.error("Failed to create review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-bold">Leave a Review</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
        >
          <div className="mb-4 flex items-center">
            <Rate
              allowHalf
              defaultValue={rating}
              onChange={handleRatingChange}
              className="text-orange-400"
            />
          </div>
          <Textarea
            placeholder="Share your experience..."
            className="w-full rounded-md border border-muted-foreground/20 p-2 focus:border-primary focus:ring-primary"
            {...register("review", { required: true })}
          />
          <input type="hidden" {...register("rating")} value={rating} />

          <Button
            type="submit"
            className="primary-gradient !text-light-900 mt-5 w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "Edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "Edit" ? "Edit review" : "Create Review"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
