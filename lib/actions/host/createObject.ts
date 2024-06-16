"use server";
import { auth } from "@/lib/auth";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { db } from "@/lib/db"; // Use the db from your module

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const createObject = async (formData: FormData) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const data = JSON.parse(formData.get("data"));
    console.log("data", data);
    const files = formData.getAll("files");
    console.log("files", files);
    const newFiles = await savePhotosLocal(files);
    console.log("newFiles", newFiles);
    const photos = await uploadPhotosCloudinary(newFiles);
    console.log("photos", photos);
    newFiles.map((file) => fs.unlink(file.filepath));

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
  } catch (error) {
    console.error("Error creating object:", error);
    return null;
  }
};

async function savePhotosLocal(files) {
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

const uploadPhotosCloudinary = async (newFiles) => {
  const multipleUploadsPromise = newFiles.map((file) =>
    cloudinary.uploader.upload(file.filepath, { folder: "restly" })
  );
  return await Promise.all(multipleUploadsPromise);
};

export async function deletePhoto(public_id: string) {
  try {
    await Promise.all([
      db.image.delete({ where: { public_id } }),
      cloudinary.uploader.destroy(public_id),
    ]);

    return { msg: "Photo deleted successfully" };
  } catch (error) {
    return { errMsg: error.message };
  }
}
