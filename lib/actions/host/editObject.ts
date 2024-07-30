"use server";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { auth } from "@/lib/auth";
import { FormSchema } from "@/app/(home)/become-a-host/components/HostForm.schema";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { db } from "@/lib/db";
import { TypeOf } from "zod";
import sharp from "sharp";
import { revalidatePath } from "next/cache";

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

export const editObject = async (
  id: string,
  formData: FormData,
  urls: string[],
) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }
    console.log("Server action urls: ", ...urls);
    const data = JSON.parse(formData.get("data") as string) as FormSchemaType;
    const files = formData.getAll("files") as FileWithType[];

    // Process new files if any
    let newPhotos: string[] = [];
    if (files.length > 0) {
      const newFiles = await savePhotosLocal(files);
      const photos = await uploadPhotosCloudinary(newFiles);
      await Promise.all(newFiles.map((file) => fs.unlink(file.filepath)));
      newPhotos = photos.map((photo) => photo.secure_url);
    }
    // Filter out undefined values from the URLs array
    const validUrls = urls.filter(Boolean);

    // Combine existing and new photo URLs
    const combinedPhotos = [...validUrls, ...newPhotos];

    // Log the combined photos for debugging
    console.log("Server action combinedPhotos: ", combinedPhotos);

    // Geocoding
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    const geocoder = mbxGeocoding({ accessToken: mapboxToken });

    const geodata = await geocoder
      .forwardGeocode({
        query: `${data.object.city}, ${data.object.country}, ${data.object.street} ${data.object.houseNumber} ${data.object.postalCode}`,
        limit: 1,
      })
      .send();

    const geometry = geodata.body.features[0]?.geometry;
    if (!geometry) {
      throw new Error("Geocoding failed, no geometry found.");
    }

    // Ensure facilities are unique
    const uniqueFacilities = Array.from(
      new Set(data.facility.map((f) => f.name)),
    ).map((name) => ({ name }));

    await db.image.deleteMany({
      where: {
        propertyId: id,
      },
    });
    // Update object in the database
    const updatedObject = await db.property.update({
      where: { id },
      data: {
        country: data.object.country,
        city: data.object.city,
        street: data.object.street,
        geometry: {
          update: {
            type: geometry.type,
            coordinates: geometry.coordinates,
          },
        },
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
          deleteMany: {},
          create: data.calendar.prices.map((price) => ({
            from: price.from,
            to: price.to,
            price: price.price,
          })),
        },
        facility: {
          deleteMany: {},
          create: uniqueFacilities,
        },
        images: {
          create: {
            urls: combinedPhotos,
          },
        },
      },
    });

    return updatedObject;
  } catch (error) {
    console.error("Error updating object:", error);
    return null;
  } finally {
    revalidatePath(`/properties/${id}`);
  }
};

async function savePhotosLocal(files: FileWithType[]): Promise<SavedFile[]> {
  const multipleBuffersPromise = files.map((file) => {
    return file.arrayBuffer().then(async (data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = "webp";

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `/${name}.${ext}`);

      await sharp(buffer)
        .resize({ width: 1920 })
        .webp({ quality: 90 })
        .toFile(uploadDir);

      return { filepath: uploadDir, filename: file.name, ext: ext };
    });
  });
  return await Promise.all(multipleBuffersPromise);
}

const uploadPhotosCloudinary = async (
  newFiles: SavedFile[],
): Promise<UploadApiResponse[]> => {
  const multipleUploadsPromise = newFiles.map((file) =>
    cloudinary.uploader.upload(file.filepath, { folder: "restly" }),
  );
  return await Promise.all(multipleUploadsPromise);
};
