import { z } from "zod";

export const ReservationSchema = z.object({
  objectId: z.string().min(1, "Object ID is required"),
  userId: z.string().min(1, "User ID is required"),
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
  guests: z.number().min(1, "Guests selection is required"),
  dateRange: z.object({
    from: z.string().min(1, "Start date is required"),
    to: z.string().min(1, "End date is required"),
  })
});