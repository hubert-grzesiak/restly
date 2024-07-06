"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Rate } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { createReview, editReview } from "@/lib/actions/properties/giveReview";

const ReviewSchema = z.object({
  review: z.string().nonempty("Review is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
});

interface Props {
  type?: string;
  userId?: string;
  property?: {
    Review: {
      body: string;
      rating: number;
    }[];
  }[];
  userReview: {
    body: string;
    rating: number;
    id: string;
  }
  objectId?: string;
}

const ReviewForm = ({ type, property, objectId, userId, userReview }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0); // Default rating value

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: userReview?.body || "",
      rating: userReview?.rating || 0,
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
    console.log(property);
    try {
      if (type === "Edit") {
        await editReview({
          id: userReview.id ?? "",
          body: values.review,
          rating: values.rating,
        });
        console.log(values);
        toast.success("Review updated successfully");
      } else {
        await createReview({
          propertyId: objectId ?? "",
          body: values.review,
          rating: values.rating,
          userId: userId ?? "",
        });
        toast.success("Review created successfully");
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
              defaultValue={userReview?.rating || 0}
              onChange={handleRatingChange}
              className="text-orange-400"
            />
          </div>
          <Textarea
            placeholder="Share your experience..."
            className="max-h-[100px] w-full rounded-md border border-muted-foreground/20 p-2 focus:border-primary focus:ring-primary"
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
