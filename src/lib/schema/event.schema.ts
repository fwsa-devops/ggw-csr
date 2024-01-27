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
});


export type TCreateEventFormSchema = z.infer<typeof createEventFormSchema>;
