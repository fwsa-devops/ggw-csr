'use server';

import { TCreateEventFormSchema } from "@/lib/schema/event.schema";
import { EventValidator } from "../validation/events.validator";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function create(event: TCreateEventFormSchema) {
  try {
    console.log("EventDao.createEvent", event);
    EventValidator.validate(event);
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const createdEvent = await prisma.event.create({
      data: {
        name: event.name,
        startDateTime: event.start_date_time,
        endDateTime: event.end_date_time,
        timezone: event.timezone || 'Asia/Kolkata',
        capacity: event.capacity,
        visibility: event.visibility,
        organizer: {
          connect: {
            email: session.user.email
          }
        }
      }
    })
    return createdEvent;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async function update(eventId: string, event: Partial<TCreateEventFormSchema>) {
  try {
    console.log("EventDao.updateEvent", event);
    await EventValidator.checkEventExists(eventId);
    EventValidator.validate(event as TCreateEventFormSchema);
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
        isDeleted: false
      }, data: {
        name: event.name,
        startDateTime: event.start_date_time,
        endDateTime: event.end_date_time,
      }
    })
    return updatedEvent;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async function remove(eventId: string) {
  try {
    console.log("EventDao.deleteEvent", eventId);
    await EventValidator.checkEventExists(eventId);
    await prisma.event.update({
      where: {
        id: eventId,
        isDeleted: false
      }, data: {
        isDeleted: true
      }
    })
    return true;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async function findById(eventId: string) {
  try {
    console.log("EventDao.getEvent", eventId);

    await EventValidator.checkEventExists(eventId);
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        isDeleted: false
      }, include: {
        organizer: true
      }
    })

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error: any) {
    console.log(error);
    throw new Error(error['message'] || error)
  }
}

export async function findAll() {
  console.log("EventDao.findAll");
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    throw new Error("User not authenticated");
  }
  const events = await prisma.event.findMany({
    where: {
      isDeleted: false,
      organizer: {
        email: session.user.email
      }
    }
  });
  return events;
}

export async function updateDates(eventId: string, event: Partial<TCreateEventFormSchema>) {
  try {
    console.log("EventDao.updateEventDates", event);
    await EventValidator.checkEventExists(eventId);
    EventValidator.validate(event as TCreateEventFormSchema);
    await prisma.event.update({
      where: {
        id: eventId,
        isDeleted: false
      },
      data: {
        startDateTime: event.start_date_time,
        endDateTime: event.end_date_time
      }
    })
    return true;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async function findAllPublicEvents() {
  console.log("EventDao.findAllPublicEvents");
  const events = await prisma.event.findMany({
    where: {
      visibility: 'PUBLIC',
      isActive: true,
      isDeleted: false,
      startDateTime: {
        gte: new Date()
      }
    },
    orderBy: {
      startDateTime: 'asc'
    },
    select: {
      id: true,
      name: true,
      startDateTime: true,
      endDateTime: true,
      organizer: {
        select: {
          name: true,
          email: true,
          image: true,
        }
      }
    }
  });
  return events;
}