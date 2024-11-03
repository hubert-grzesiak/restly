"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Rate } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { createReview, editReview } from "@/lib/actions/properties/giveReview";
import { Review } from "@prisma/client";
import { Tooltip } from "antd";

const ReviewSchema = z.object({
  review: z.string().min(1, "Review is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
});

interface Props {
  type?: string;
  userId?: string;
  property: {
    id: string;
    name: string;
    images: {
      urls: string[];
    }[];
    Review: {
      body: string;
      rating: number;
    }[];
  };
  userReview: Review | null;
  objectId?: string;
  dateTo?: string;
  reservationId?: string;
}

const ReviewForm = ({
  type,
  objectId,
  userId,
  userReview,
  dateTo,
  reservationId,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());
  const [isDateValid, setIsDateValid] = useState(true);

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: userReview?.body || "",
      rating: userReview?.rating || 0,
    },
  });
  const { register, setValue, reset } = form;

  const handleRatingChange = (value: number) => {
    setValue("rating", value);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    console.log("submitting review", values);
    setIsSubmitting(true);
    try {
      if (type === "Edit") {
        await editReview({
          id: userReview?.id ?? "",
          body: values.review,
          rating: values.rating,
        });
        toast.success("Review updated successfully");
      } else {
        await createReview({
          propertyId: objectId ?? "",
          body: values.review,
          rating: values.rating,
          userId: userId ?? "",
          reservationId: reservationId ?? "",
        });
        toast.success("Review created successfully");
      }
      setFormKey(Date.now());
    } catch (error) {
      console.error("Failed to create review", error);
      toast.error("Failed to create review");
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    // reset({
    //   review: userReview?.body || "",
    //   rating: userReview?.rating || 0,
    // });

    const today = new Date();

    const dateToCheck = dateTo
      ? new Date(
          parseInt(dateTo.split(".")[2], 10),
          parseInt(dateTo.split(".")[1], 10) - 1,
          parseInt(dateTo.split(".")[0], 10),
        )
      : null;

    setIsDateValid(!dateToCheck || today >= dateToCheck);
  }, [formKey, userReview, reset, dateTo]);

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-bold">Leave a Review</h3>
      <Form {...form}>
        <form
          key={formKey}
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-2"
        >
          <div className="mb-4 flex items-center">
            <Rate
              defaultValue={userReview?.rating || 0}
              onChange={handleRatingChange}
              className="text-orange-400"
            />
          </div>
          <Tooltip
            title={
              !isDateValid ? "You can only leave a review after your stay" : ""
            }
          >
            <Textarea
              placeholder="Share your experience..."
              className="max-h-[100px] w-full rounded-md border border-muted-foreground/20 p-2 focus:border-primary focus:ring-primary"
              disabled={!isDateValid}
              {...register("review", { required: true })}
            />
          </Tooltip>
          <input type="hidden" {...register("rating")} />

          <Button
            type="submit"
            className="primary-gradient !text-light-900 mt-5 w-fit"
            disabled={isSubmitting || !isDateValid}
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
