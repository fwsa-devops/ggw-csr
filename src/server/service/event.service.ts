'use server';

import { TCreateEventFormSchema } from "@/lib/schema/event.schema";
import { EventValidator } from "../validation/events.validator";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async  function create(event: TCreateEventFormSchema) {
  try {
    console.log("EventDao.createEvent", event);
    EventValidator.validate(event);
    const createdEvent = await prisma.event.create({
      data: {
        name: event.name,
        startDateTime: event.start_date_time,
        endDateTime: event.end_date_time,
        timezone: event.timezone || 'Asia/Kolkata',
      }
    })
    return createdEvent;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async  function update(eventId: string, event: Partial<TCreateEventFormSchema>) {
  try {
    console.log("EventDao.updateEvent", event);
    await EventValidator.checkEventExists(eventId);
    EventValidator.validate(event as TCreateEventFormSchema);
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId
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

export async  function remove(eventId: string) {
  try {
    console.log("EventDao.deleteEvent", eventId);
    await EventValidator.checkEventExists(eventId);
    await prisma.event.delete({
      where: {
        id: eventId
      }
    })
    return true;
  } catch (error: any) {
    console.error(error);
    throw new Error(error['message'] || error)
  }
}

export async  function find(eventId: string) {
  try {
    console.log("EventDao.getEvent", eventId);
    await EventValidator.checkEventExists(eventId);
    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }
    })
    return event;
  } catch (error: any) {
    console.log(error);
    throw new Error(error['message'] || error)
  }
}

export async  function findAll() {
  console.log("EventDao.findAll");
  const session = await getServerSession();

  if(!session){
    throw new Error("User not authenticated");
  }

  const events = await prisma.event.findMany();
  return events;
}

export async  function updateDates(eventId: string, event: Partial<TCreateEventFormSchema>) {
  try {
    console.log("EventDao.updateEventDates", event);
    await EventValidator.checkEventExists(eventId);
    EventValidator.validate(event as TCreateEventFormSchema);
    await prisma.event.update({
      where: {
        id: eventId
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

