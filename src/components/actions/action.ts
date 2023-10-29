'use server';

import prisma from '@/lib/prisma';
import { activityFormSchema, eventFormSchema } from '@/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

type ResponseType = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: any;
};

export async function createActivity(
  formData: z.infer<typeof activityFormSchema>,
): Promise<ResponseType> {
  const data = activityFormSchema.safeParse(formData);
  console.log(data);
  try {
    let zodErrors = {};

    if (!data.success) {
      data.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      throw {
        success: true,
        message: data.error.message,
        errors: zodErrors,
      };
    }

    let response;

    if (data.data.id) {
      response = await prisma.activity.update({
        where: {
          id: data.data.id,
        },
        data: {
          ...data.data,
          tags: {},
        },
      });
    } else {
      response = await prisma.activity.create({
        data: {
          ...data.data,
          tags: {},
        },
      });
    }

    if (response === null) {
      throw { success: false, message: 'Failed to UPSERT activity' };
    }

    // REMOVE old Tags
    await prisma.activityTags.deleteMany({
      where: {
        activity_id: response.id,
      },
    });

    // REMOVE old Tags
    await prisma.activityTags.createMany({
      skipDuplicates: true,
      data: data.data.tags.map((t) => ({
        tag_id: t,
        activity_id: response.id,
      })),
    });

    revalidatePath(`/activities`);

    return {
      success: true,
      message: data.data.id
        ? 'Activity updated successfully'
        : 'Activity created successfully',
      data: response,
    };
  } catch (error: unknown) {
    console.log(error);

    if (typeof error === 'string') {
      return {
        success: false,
        message: 'Failed to Submit Form',
      };
    } else {
      return {
        ...(error as ResponseType),
      };
    }
  }
}

export async function createActivityEvent(
  formData: z.infer<typeof eventFormSchema>,
) {
  const data = eventFormSchema.safeParse(formData);
  console.log(data);

  const session = await getServerSession();

  try {
    let zodErrors = {};

    if (!data.success) {
      data.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      throw {
        success: true,
        message: data.error.message,
        errors: zodErrors,
      };
    }

    let response;

    if (data.data.id) {
      response = await prisma.event.update({
        where: {
          id: data.data.id,
        },
        data: {
          city: data.data.city,
          location: data.data.location,
          description: data.data.description,
          max_volunteers: data.data.max_volunteers,
          min_volunteers: data.data.min_volunteers,
          is_dates_announced: data.data.is_dates_announced,
          date_announcement_text: data.data.date_announcement_text,
        },
      });
    } else {
      response = await prisma.event.create({
        data: {
          city: data.data.city,
          location: data.data.location,
          activityId: data.data.activityId,
          description: data.data.description,
          author_id: session?.user?.email as string,
          max_volunteers: data.data.max_volunteers,
          min_volunteers: data.data.min_volunteers,
          is_dates_announced: data.data.is_dates_announced,
          date_announcement_text: data.data.date_announcement_text,
        },
      });
    }

    if (response === null) {
      throw { success: false, message: 'Failed to UPSERT activity' };
    }

    // REMOVE old Leaders
    await prisma.eventLeader.deleteMany({
      where: {
        event_id: response.id,
      },
    });

    // ADDING new Leaders
    await prisma.eventLeader.createMany({
      skipDuplicates: true,
      data: data.data.leaders.map((t) => ({
        event_id: response.id,
        user_id: t,
      })),
    });

    revalidatePath(`/activities/${formData.activityId}`);

    return {
      success: true,
      message: data.data.id
        ? 'Event updated successfully'
        : 'Event created successfully',
      data: response,
    };
  } catch (error: unknown) {
    console.log(error);

    if (typeof error === 'string') {
      return {
        success: false,
        message: 'Failed to Submit Form',
      };
    } else {
      return {
        ...(error as ResponseType),
      };
    }
  }
}

export async function joinEvent(eventId: string): Promise<ResponseType> {
  const session = await getServerSession();

  try {
    if (
      session?.user?.email === undefined ||
      !(
        session?.user?.email &&
        /^\S+freshworks\.com$/.test(session?.user?.email)
      )
    ) {
      throw 'Not part of Freshworks';
    }

    const user = await prisma.user.upsert({
      where: { email: session?.user?.email || '' },
      update: {},
      create: {
        email: session?.user?.email || '',
        name: session?.user?.name || '',
        image: session?.user?.image || '',
      },
    });

    if (!(user && user.email)) {
      throw 'Un-Authorized User';
    }

    await prisma.volunteers.create({
      data: {
        event_id: eventId,
        user_id: user.email,
      },
    });

    revalidatePath(`/activities/${eventId}`, 'page');
    return {
      success: true,
      message: 'Successfully Joined Event',
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: e,
    };
  }
}

export async function unJoinEvent(eventId: string): Promise<ResponseType> {
  const session = await getServerSession();

  try {
    if (session?.user?.email === undefined) {
      throw 'Not authorized session';
    }

    const user = await prisma.user.upsert({
      where: { email: session?.user?.email || '' },
      update: {},
      create: {
        email: session?.user?.email || '',
        name: session?.user?.name || '',
        image: session?.user?.image || '',
      },
    });

    if (!(user && user.email)) {
      throw 'Not authorized';
    }

    await prisma.volunteers.deleteMany({
      where: {
        event_id: eventId,
        user_id: user.email,
      },
    });

    revalidatePath(`/activities/${eventId}`, 'page');

    return {
      success: true,
      message: 'Successfully Unjoined Event',
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: e,
    };
  }
}
