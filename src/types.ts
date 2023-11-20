import {
  EventLeader,
  Volunteers,
  ActivityTags,
  Activity,
  Tag,
  User,
  Event,
} from '@prisma/client';
import * as z from 'zod';

export const activityFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  cover: z.string().url(),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(10, 'Description is required'),
  duration: z.union([z.number().int().positive().min(1), z.nan()]),
  // duration: z.string().optional(),
  author_id: z.string(),
  status: z.enum(['OPEN', 'DRAFT', 'CLOSED']),
  tags: z.array(z.string()),
});

export const eventFormSchema = z.object({
  activityId: z.string(),
  id: z.string().optional(),
  city: z.enum([
    'Chennai',
    'Bangalore',
    'North_America',
    'Bellevue',
    'San_Mateo',
    'Denver',
    'New_York',
  ]),
  location: z.string().min(2),

  leaders: z
    .array(z.string(), { description: 'Atleast 1 leader must be selected' })
    .superRefine((val, ctx) => {
      if (val.length === 0)
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          fatal: true,
          type: 'array',
          inclusive: true,
          message: 'Atleast 1 leader must be selected',
        });
      return z.NEVER;
    }),
  volunteers: z.array(z.string()).optional(),

  description: z.string().optional(),
  min_volunteers: z.union([z.number().int().positive().min(1), z.nan()]),
  max_volunteers: z.union([z.number().int().positive().min(1), z.nan()]),
  published: z.boolean(),

  is_dates_announced: z.boolean(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  timeZone: z.string().default('IST'),
  date_announcement_text: z.string().optional(),
});

export const eventFeedbackFormSchema = z.object({
  eventId: z.string(),
  activityId: z.string(),
  assets: z.array(z.object({ url: z.string(), name: z.string().optional() })),
  comment: z.string().min(5, 'Few more words... 🥺🥺'),
  author_id: z.string(),
});

export interface IActivity extends Activity {
  events: ({
    leaders: ({ user: User } & EventLeader)[];
    volunteers: ({ user: User } & Volunteers)[];
  } & Event)[];
  tags?: ({ tag: Tag } & ActivityTags)[];
  author?: { name: string };
}
export interface IEvent extends Event {
  leaders: ({ user: User } & EventLeader)[];
  volunteers: ({ user: User } & Volunteers)[];
}
export interface IActivityForm extends Activity {
  tags: string[];
}
