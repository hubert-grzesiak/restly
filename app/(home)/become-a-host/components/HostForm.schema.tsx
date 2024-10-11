import { z } from "zod";

export const FormSchema = z.object({
  object: z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    houseNumber: z.string().min(1, "House Number is required"),
    apartmentNumber: z.string(),
    numberOfBedrooms: z
      .number()
      .min(1, "Number of bedrooms must be at least 1")
      .max(20, "Number of bedrooms must be less than 100"),
    minimumStay: z
      .number()
      .min(1, "Minimum stay must be at least 1 day")
      .max(14, "Minimum stay must be less than 365 days"),
    maximumStay: z
      .number()
      .min(1, "Maximum stay must be at least 1 day")
      .max(14, "Maximum stay must be less than 365 days"),
    maxPeople: z
      .number()
      .min(1, "Maximum number of people must be at least 1")
      .max(100, "Maximum number of people must be less than 100"),
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
          price: z.number().gt(0),
        }),
      )
      .min(1, "At least one price is required"),
  }),
  image: z.object({
    isMain: z.boolean().optional(),
    urls: z.array(z.string()).min(0, "At least one image is required"),
  }),
});

const PriceItemSchema = z
  .object({
    from: z.string().nonempty({ message: "Date from is required" }),
    to: z.string().nonempty({ message: "Date to is required" }),
    price: z.number().positive({ message: "Price must be greater than zero" }),
  })
  .refine(
    (data) => {
      const fromDate = new Date(data.from);
      const toDate = new Date(data.to);
      return toDate > fromDate;
    },
    {
      message: "Date to must be at least one day after date from",
      path: ["to"],
    },
  );

export const PricesSchema = z.object({
  calendar: z.object({
    prices: z.array(PriceItemSchema),
  }),
});
// geometry: z.object({
//   type: z.literal("Point"), // Ensure the type is always "Point"
//   coordinates: z.tuple([z.number(), z.number()]), // Longitude and latitude
// }),
