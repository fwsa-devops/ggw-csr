import { z } from "zod";

export const createEventFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  start_date_time: z.date({
    required_error: 'Start date is required',
  }),
  end_date_time: z.date({
    required_error: 'End date is required',
  }),
  timezone: z.string().optional(),
  organizer: z.string().optional(),
  capacity: z.number().int().min(0).default(0),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
  isActive: z.boolean().default(true),
});


export type TCreateEventFormSchema = z.infer<typeof createEventFormSchema>;
