"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  rating: z.number(),
  body: z.string(),
});

const CreateReview = FormSchema;
const UpdateReview = FormSchema;

export const createReview = async ({
  body,
  rating,
  propertyId,
  userId,
}: {
  body: string;
  rating: number;
  propertyId: string;
  userId: string;
}) => {
  const session = await auth();
  const validatedFields = CreateReview.safeParse({
    body,
    rating,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create a review.",
    };
  }

  const { body: validatedBody, rating: validatedRating } = validatedFields.data;

  if (session?.user?.email) {
    try {
      // Create the new review
      await db.review.create({
        data: {
          body: validatedBody,
          rating: validatedRating,
          userId: userId ?? "",
          propertyId: propertyId ?? "",
        },
      });
      return { success: "Review created" };
    } catch (error) {
      return { error: "Error creating a review" };
    } finally {
      revalidatePath("/profile/visited");
    }
  }
  return { error: "Forbidden Server Action!" };
};

export async function editReview({
  id,
  body,
  rating,
}: {
  id: string;
  body: string;
  rating: number;
}) {
  const session = await auth();

  const validatedFields = UpdateReview.safeParse({
    body,
    rating,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update a review.",
    };
  }

  if (session?.user?.email) {
    try {
      await db.review.update({
        where: { id },
        data: {
          body,
          rating,
        },
      });
      return { success: "Review updated" };
    } catch (error) {
      return { error: "Error updating a review" };
    } finally {
      revalidatePath("/profile/visited");
    }
  }
  return { error: "Forbidden Server Action!" };
}

export const deleteReview = async (id: string) => {
  const session = await auth();

  if (session?.user?.email) {
    try {
      await db.review.delete({
        where: { id },
      });
      return { success: "Review deleted" };
    } catch (error) {
      return { error: "Error deleting a review" };
    }
  }
  return { error: "Forbidden Server Action!" };
};
