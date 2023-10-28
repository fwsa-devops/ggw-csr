import {
  EventLeader,
  Volunteers,
  ActivityTags,
  Activity,
  Tag,
  User,
  Event,
  Posts,
} from '@prisma/client';
import * as z from 'zod';

export const activityFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  cover: z.string().url(),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(10, 'Description is required'),
  city: z.enum(['Chennai', 'Bangalore']),
  duration: z.union([z.number().int().positive().min(1), z.nan()]),
  // duration: z.string().optional(),
  author_id: z.string(),
  status: z.enum(['OPEN', 'DRAFT', 'CLOSED']),
  tags: z.array(z.string()),
});


export const eventFormSchema = z.object({
  activityId: z.string(),
  id: z.string().optional(),
  city: z.enum(['Chennai', 'Bangalore']),
  location: z.string().min(2),

  leaders: z.array(z.string(), { description: 'Atleast 1 leader must be selected' }).superRefine((val, ctx) => { if (val.length === 0) ctx.addIssue({ code: z.ZodIssueCode.too_small, minimum: 1, fatal: true, type: 'array', inclusive: true, message: 'Atleast 1 leader must be selected' }); return z.NEVER; }),
  volunteers: z.array(z.string()).optional(),

  description: z.string().optional(),
  min_volunteers: z.union([z.number().int().positive().min(1), z.nan()]),
  max_volunteers: z.union([z.number().int().positive().min(1), z.nan()]),
  published: z.boolean(),

  is_dates_announced: z.boolean(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  date_announcement_text: z.string().optional()
})
  .refine((data) => ((!data.is_dates_announced) && (data.date_announcement_text === "" || data.date_announcement_text === undefined)), {
    message: "Announcement Details is required if actuall dates are not announced",
    path: ['date_announcement_text']
  })
  // .refine((data) => data.startTime >= data.endTime, {
  //   message: "End time must be greater the Start time",
  //   path: ['startTime', 'endTime']
  // })
  .refine((data) => data.min_volunteers > data.max_volunteers, {
    message: "Max Volunteers must be eithor same or greater than Min Volunteers",
    path: ['min_volunteers', 'max_volunteers']
  })


export interface IActivity extends Activity {
  events: ({
    leaders: ({ user: User } & EventLeader)[];
    volunteers: ({ user: User } & Volunteers)[];
  } & Event)[];
  tags?: ({ tag: Tag } & ActivityTags)[];
  author?: { name: string };
  posts?: Posts[];
}

export interface IEvent extends Event {
  leaders: ({ user: User } & EventLeader)[];
  volunteers: ({ user: User } & Volunteers)[];
}

export interface IActivityForm extends Activity {
  tags: string[];
}
