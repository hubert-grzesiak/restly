"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import console from "console";
import { object } from "zod";

export const uploadToCloudinary = async (newFiles: any) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const multiplePhotos = newFiles.map((file: any) => {
      cloudinary.v2.uploader.upload(file.filePath, { folder: "restly" });
    });
    console.log();

    return await Promise.all(multiplePhotos);
  } catch (error) {
    console.error("Error creating object:", error);
    return null;
  }
};

export const uploadPhotos = async (formData: any) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }
   
    console.log(photos);
  } catch (error) {
    console.error("Error creating object:", error);
    return null;
  }
};
