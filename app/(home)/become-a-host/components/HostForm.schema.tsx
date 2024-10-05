import { z } from "zod";

export const FormSchema = z.object({
  object: z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    numberOfBedrooms: z.string().min(1, "Number of Bedrooms is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    houseNumber: z.string().min(1, "House Number is required"),
    apartmentNumber: z.string(),
    minimumStay: z.string().min(1, "Minimum Stay is required"),
    maximumStay: z.string().min(1, "Maximum Stay is required"),
    maxPeople: z.number().min(1, "Max People must be at least 1"),
  }),
  facility: z.array(
    z.object({
      name: z.string().min(1, "Facility name is required"),
    }),
  ),
  calendar: z.object({
    checkInTime: z.string().min(1, "Check-in Time is required"),
    checkOutTime: z.string().min(1, "Check-out Time is required"),
    prices: z
      .array(
        z.object({
          from: z.string().min(1, "Start date is required"),
          to: z.string().min(1, "End date is required"),
          price: z.number().min(0, "Price must be at least 0"),
        }),
      )
      .min(1, "At least one price is required"),
  }),
  image: z.object({
    description: z.string(),
    isMain: z.boolean(),
    urls: z.array(z.string()),
  }),
});

export const PricesSchema = z.object({
  calendar: z.object({
    prices: z.array(
      z.object({
        from: z.string().min(1, "Start date is required"),
        to: z.string().min(1, "End date is required"),
        price: z.number().min(0, "Price must be at least 0"),
      }),
    ),
  }),
});
// geometry: z.object({
//   type: z.literal("Point"), // Ensure the type is always "Point"
//   coordinates: z.tuple([z.number(), z.number()]), // Longitude and latitude
// }),
