import { z } from 'zod';

export const FormSchema = z.object({
  object: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    name: z.string(),
    description: z.string(),
    numberOfBedrooms:z.string(),
    postalCode: z.string(),
    houseNumber: z.string(),
    apartmentNumber: z.string(),
    minimumStay: z.string(),
    maximumStay: z.string(),
    maxPeople: z.string(),
  }),
  facility: z.array(z.object({
    name: z.string(),
  })),
  calendar: z.object({

    checkInTime: z.string(),
    checkOutTime: z.string(),
    prices: z.array(z.object({
      year: z.number(),
      month: z.number(),
      dailyRate: z.number(),
    })),
  }),
  image: z.object({
    description: z.string(),
    isMain: z.boolean(),
    urls: z.array(z.string()),
  }),
});
