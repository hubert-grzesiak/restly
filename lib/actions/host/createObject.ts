"use server";
import { auth } from "@/lib/auth";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { db } from "@/lib/db"; // Use the db from your module
import { TypeOf } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});

type FormSchemaType = TypeOf<typeof FormSchema>;

interface FileWithType extends File {
  type: string;
}

interface SavedFile {
  filepath: string;
  filename: string;
  ext: string;
}

export const createObject = async (formData: FormData) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const data = JSON.parse(formData.get("data") as string) as FormSchemaType;
    console.log("data", data);
    const files = formData.getAll("files") as FileWithType[];
    console.log("files", files);
    const newFiles = await savePhotosLocal(files);
    console.log("newFiles", newFiles);
    const photos = await uploadPhotosCloudinary(newFiles);
    console.log("photos", photos);
    await Promise.all(newFiles.map((file) => fs.unlink(file.filepath)));

    const newPhotos = photos.map((photo) => photo.secure_url);
    console.log("newPhotos", newPhotos);

    const newObject = await db.object.create({
      data: {
        country: data.object.country,
        city: data.object.city,
        street: data.object.street,
        name: data.object.name,
        description: data.object.description,
        numberOfBedrooms: data.object.numberOfBedrooms,
        postalCode: data.object.postalCode,
        houseNumber: data.object.houseNumber,
        apartmentNumber: data.object.apartmentNumber,
        minimumStay: data.object.minimumStay,
        maximumStay: data.object.maximumStay,
        maxPeople: data.object.maxPeople,
        checkInTime: data.calendar.checkInTime,
        checkOutTime: data.calendar.checkOutTime,
        ownerId: session?.user?.id ?? "",
        prices: {
          create: data.calendar.prices.map((price) => ({
            year: price.year,
            month: price.month,
            dailyRate: price.dailyRate,
          })),
        },
        facility: {
          create: data.facility.map((facility) => ({
            name: facility.name,
          })),
        },
        images: {
          create: {
            description: data.image.description,
            isMain: data.image.isMain,
            urls: newPhotos,
          },
        },
      },
    });
    return newObject;
  } catch (error: any) {
    console.error("Error creating object:", error);
    return null;
  }
};

async function savePhotosLocal(files: FileWithType[]): Promise<SavedFile[]> {
  const multipleBuffersPromise = files.map((file) => {
    return file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `/${name}.${ext}`);

      // Ensure file write completes before proceeding
      return fs.writeFile(uploadDir, buffer).then(() => {
        return { filepath: uploadDir, filename: file.name, ext: ext };
      });
    });
  });
  return await Promise.all(multipleBuffersPromise);
}

const uploadPhotosCloudinary = async (
  newFiles: SavedFile[]
): Promise<UploadApiResponse[]> => {
  const multipleUploadsPromise = newFiles.map((file) =>
    cloudinary.uploader.upload(file.filepath, { folder: "restly" })
  );
  return await Promise.all(multipleUploadsPromise);
};

export async function deletePhoto(
  public_id: string
): Promise<{ msg?: string; errMsg?: string }> {
  try {
    await Promise.all([
      db.image.delete({ where: { public_id } }),
      cloudinary.uploader.destroy(public_id),
    ]);

    return { msg: "Photo deleted successfully" };
  } catch (error: any) {
    return { errMsg: error.message };
  }
}
