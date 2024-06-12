"use server";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const createObject = async (rawData) => {
  try {
    const data = rawData;

    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

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
        prices: {
          create: data.calendar.prices.map((price) => ({
            year: price.year,
            month: price.month,
            dailyRate: price.dailyRate,
          })),
        },
        facilities: {
          create: data.facility.map((facility) => ({
            name: facility.name,
          })),
        },
        images: {
          create: {
            description: data.image.description,
            isMain: data.image.isMain,
            urls: data.image.urls,
          },
        },
        calendar: {
          create: {
            checkInTime: data.calendar.checkInTime,
            checkOutTime: data.calendar.checkOutTime,
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

export default createObject;
