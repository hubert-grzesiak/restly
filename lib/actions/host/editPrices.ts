"use server";
import { auth } from "@/lib/auth";
import { PricesSchema } from "@/app/(home)/become-a-host/components/HostForm.schema";

import { db } from "@/lib/db";
import { TypeOf } from "zod";

import { revalidatePath } from "next/cache";

type FormSchemaType = TypeOf<typeof PricesSchema>;

export const editPrices = async (id: string, formData: FormData) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }
    const data = JSON.parse(formData.get("data") as string) as FormSchemaType;

    const updatedObject = await db.property.update({
      where: { id },
      data: {
        prices: {
          deleteMany: {},
          create: data.calendar.prices.map((price) => ({
            from: price.from,
            to: price.to,
            price: price.price,
          })),
        },
      },
    });
    return updatedObject;
  } catch (error) {
    console.error("Error updating prices:", error);
    return null;
  } finally {
    revalidatePath(`/properties/${id}`);
  }
};
