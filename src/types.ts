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

export interface IActivity extends Activity {
  events: ({
    leaders: ({ user: User } & EventLeader)[];
    volunteers: ({ user: User } & Volunteers)[];
  } & Event)[];
  tags?: ({ tag: Tag } & ActivityTags)[];
  author?: { name: String };
  posts?: Posts[];
}

export interface IEvent extends Event {
  leaders: ({ user: User } & EventLeader)[];
  volunteers: ({ user: User } & Volunteers)[];
}

export interface IActivityForm extends Activity {
  tags: string[];
}
