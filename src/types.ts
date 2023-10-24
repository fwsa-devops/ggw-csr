import * as z from 'zod';

export const activityFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  cover: z.string().url(),
  summary: z.string(),
  description: z.string(),
  city: z.string().optional(),
  duration: z.union([z.number().int().positive().min(1), z.nan()]),
  // duration: z.string().optional(),
  author_id: z.string(),
  status: z.enum(["OPEN", "DRAFT", "CLOSED"]),
  tags: z.array(z.string())
})