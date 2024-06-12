/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod";

export const newEventSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, "Title must be at least 2 characters"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, "Description must be at least 10 characters"),
  start: z.object({
    date: z.date().refine((val) => !isNaN(Date.parse(val.toISOString())), {
      message: "Invalid date",
    }),
    time: z.string(),
  }),
  end: z.object({
    date: z.date().refine((val) => !isNaN(Date.parse(val.toISOString())), {
      message: "Invalid date",
    }),
    time: z.string(),
  }),
  timezone: z.string(),
  image: z.string().url(),
  location: z.object({
    full_address: z.string().min(5, "Address must be at least 5 characters"),
    lat: z.number(),
    lng: z.number(),
  }),
  address: z.object({
    name: z.string().optional(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zip: z.string(),
  }),
  maxParticipants: z
    .number()
    .int({
      message: "Max participants must be a whole number",
    })
    .positive({
      message: "Max participants must be a positive number",
    })
    .optional(),
});

export type NewEventSchema = z.infer<typeof newEventSchema>;
