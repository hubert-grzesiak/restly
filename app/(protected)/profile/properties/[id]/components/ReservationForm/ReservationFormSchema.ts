import { z } from "zod";

export const ReservationSchema = z.object({
  objectId: z.string().nonempty("Object ID is required"),
  userId: z.string().nonempty("User ID is required"),
  dateRange: z.object({
    from: z.string().nonempty("Start date is required"),
    to: z.string().nonempty("End date is required"),
  }),
  guests: z.number().min(1, "Guests selection is required"),
});
