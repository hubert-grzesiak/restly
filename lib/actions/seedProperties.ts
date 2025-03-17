"use server";
import { db } from "@/lib/db";
import { faker } from "@faker-js/faker";

export async function seedProperties() {
  try {
    for (let i = 0; i < 100; i++) {
      await db.property.create({
        data: {
          country: faker.location.country(),
          city: faker.location.city(),
          street: faker.location.street(),
          geometry: {
            create: {
              type: "Point",
              coordinates: [
                faker.location.longitude({ min: -80, max: 80 }),
                faker.location.longitude({ min: -80, max: 80 }),
              ],
            },
          },
          name: faker.company.name(),
          description: faker.lorem.paragraph(),
          numberOfBedrooms: faker.number.int({ min: 1, max: 10 }).toString(),
          postalCode: faker.location.zipCode(),
          houseNumber: faker.number.int({ min: 1, max: 100 }).toString(),
          apartmentNumber: faker.number.int({ min: 1, max: 100 }).toString(),
          minimumStay: faker.number.int({ min: 1, max: 30 }).toString(),
          maximumStay: faker.number.int({ min: 1, max: 365 }).toString(),
          maxPeople: faker.number.int({ min: 1, max: 20 }),
          checkInTime: "10:00",
          checkOutTime: "14:00",
          ownerId: "66b0c765124c24e10224b048",
          softDeleted: false,
          prices: {
            create: [
              {
                from: "2024-08-05",
                to: "2024-08-25",
                price: faker.number.int({ min: 100, max: 1000 }),
              },
            ],
          },
          facility: {
            create: [
              {
                name: "Kitchen",
              },
            ],
          },
          images: {
            create: [
              {
                urls: [faker.image.url()],
              },
            ],
          },
        },
      });
    }
    return { message: "Seeding successful" };
  } catch (error) {
    console.error(error);
    return { message: "Seeding failed", error };
  } finally {
    await db.$disconnect();
  }
}
