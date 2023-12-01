'use server';

import prisma from '@/lib/prisma';
import {
  activityFormSchema,
  eventFeedbackFormSchema,
  eventFormSchema,
} from '@/types';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

export type ResponseType = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: any;
};

export async function createActivity(
  formData: z.infer<typeof activityFormSchema>,
): Promise<ResponseType> {
  const data = activityFormSchema.safeParse(formData);
  // console.log(data);
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
    // console.log(error);

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
  // console.log('createActivityEvent', data);

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
          startTime: data.data.startTime,
          endTime: data.data.endTime,
          status: data.data.status,
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
          startTime: data.data.startTime,
          endTime: data.data.endTime,
          status: data.data.status,
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
    // console.log(error);

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

    const alreadyPartOfAnotherEvent = await prisma.volunteers.findMany({
      where: {
        user_id: user.email,
      },
      include: {
        event: {
          include: {
            activity: true,
          },
        },
      },
    });

    if (alreadyPartOfAnotherEvent.length > 0) {
      throw (
        `You're already part of another event - ` +
        alreadyPartOfAnotherEvent[0].event.activity.name
      );
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
    // console.log(e);
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
    // console.log(e);
    return {
      success: false,
      message: e,
    };
  }
}

export async function createEventFeedback(
  formData: z.infer<typeof eventFeedbackFormSchema>,
) {
  const data = eventFeedbackFormSchema.safeParse(formData);
  // console.log(data);

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

    const { activityId, eventId, assets, comment, author_id } = data.data;

    const feedback = await prisma.feedback.create({
      data: {
        comment: comment,
        activity_id: activityId,
        event_id: eventId,
        author_id: author_id,
        assets: {
          create: [
            ...assets.map((_a) => ({
              Asset: {
                create: _a,
              },
            })),
          ],
        },
      },
    });

    revalidatePath(`/activities/${formData.activityId}`);

    return {
      success: true,
      message: 'Feedback created successfully',
      data: feedback,
    };
  } catch (error) {
    // console.log(error);

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

export async function getActivitiesJoined() {
  const session = await getServerSession();

  const volunteers = await prisma.volunteers.findMany({
    where: {
      user_id: session?.user?.email || '',
    },
    include: {
      event: {
        include: {
          activity: true,
        },
      },
    },
  });

  return volunteers;
}

export async function addParticipant(
  eventId: string,
  participantEmail: string,
): Promise<ResponseType> {
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
      throw 'Un-Authorized Action';
    }

    await prisma.volunteers.create({
      data: {
        event_id: eventId,
        user_id: participantEmail,
      },
    });

    // revalidatePath(`/activities/${eventId}`, 'page');
    return {
      success: true,
      message: 'Successfully Joined Event',
    };
  } catch (e: any) {
    // console.log(e);
    return {
      success: false,
      message: e,
    };
  }
}

export async function removeParticipant(
  eventId: string,
  participantEmail: string,
): Promise<ResponseType> {
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

    const volunteer = await prisma.volunteers.findFirst({
      where: {
        event_id: eventId,
        user_id: participantEmail,
      },
    });

    if (!volunteer) {
      throw 'Participant is not part of this Event';
    }

    await prisma.volunteers.delete({
      where: {
        id: volunteer.id,
      },
    });

    // revalidatePath(`/activities/${eventId}`, 'page');
    return {
      success: true,
      message: 'Successfully Unjoined Event',
    };
  } catch (e: any) {
    // console.log(e);
    return {
      success: false,
      message: e,
    };
  }
}

export async function updateParticipant(
  eventId: string,
  addUsers: User[] = [],
  removeUsers: User[] = [],
): Promise<ResponseType> {
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
        user_id: {
          in: removeUsers.map((_r) => _r.email),
        },
      },
    });

    // console.log('removed participants, adding new participants');

    await prisma.volunteers.createMany({
      skipDuplicates: true,
      data: addUsers.map((_u) => ({ event_id: eventId, user_id: _u.email })),
    });

    return {
      success: true,
      message: 'Successfully Updated Participants',
    };
  } catch (error: any) {
    // console.log(error);
    return {
      success: false,
      message: error,
    };
  }
}

export async function exportEventData(eventId: string) {
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

    const eventDetails = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
      include: {
        _count: true,
        activity: true,
        leaders: {
          include: {
            user: true,
          },
        },
        author: {
          select: {
            email: true,
          },
        },
        feedback: {
          select: {
            author: {
              select: {
                email: true,
              },
            },
            comment: true,
            assets: {
              include: {
                Asset: {
                  select: {
                    url: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        volunteers: {
          include: {
            user: true,
          },
        },
      },
    });

    const activity = Object.assign({}, { ...eventDetails?.activity });
    const volunteer = eventDetails?.volunteers.map(({ user, assigned_at }) => ({
      ...user,
      assigned_at,
    }));
    const feedbacks = eventDetails?.feedback.map(
      ({ author, assets, comment }) => ({
        author: author.email,
        comment,
        assets: assets.map(({ Asset }) => Asset.url).join(', '),
      }),
    );

    const {
      id,
      city,
      leaders,
      location,
      description,
      min_volunteers,
      max_volunteers,
      published,
      is_dates_announced,
      startTime,
      endTime,
      date_announcement_text,
      author,
    } = eventDetails!;

    const event = {
      id,
      city,
      location,
      description,
      min_volunteers,
      max_volunteers,
      is_dates_announced,
      startTime,
      endTime,
      date_announcement_text,
      published,
      author: author.email,
      leaders: leaders.map(({ user }) => user.email).join(', '),
    };

    const formattedResponse = {
      event,
      activity,
      volunteer,
      feedbacks,
    };

    // console.log(JSON.stringify(formattedResponse, null, 2));

    return formattedResponse;
  } catch (error) {
    // console.log(error);
  }
}
