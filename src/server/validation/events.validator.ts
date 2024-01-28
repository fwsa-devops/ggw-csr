
import prisma from "@/lib/prisma";
import { TCreateEventFormSchema, createEventFormSchema } from "@/lib/schema/event.schema";
import { UserValidator } from "./user.validator";
import { getServerSession } from "next-auth";

export class EventValidator {

  public static validate(event: TCreateEventFormSchema) {
    if (!event) {
      throw new Error("Event is undefined");
    }

    if (!event.name || event.name.trim().length < 2) {
      throw new Error("Event name is undefined");
    }

    if (!event.start_date_time) {
      throw new Error("Event start date is undefined");
    }

    const now = new Date();

    if (new Date(event.start_date_time) < now) {
      throw new Error('Event start date is in the past');
    }

    if (!event.end_date_time) {
      throw new Error("Event end date is undefined");
    }

    if (new Date(event.end_date_time) < now) {
      throw new Error('Event end date is in the past');
    }

    if (new Date(event.start_date_time) > new Date(event.end_date_time)) {
      throw new Error("Event start date is greater than end date");
    }

    const result = createEventFormSchema.safeParse(event);

    if (!result.success) {
      throw new Error(result.error.message);
    }

  }

  public static async checkEventExists(eventId: string) {
    if (!eventId || eventId.trim().length < 1) {
      throw new Error("Event id is undefined");
    }

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        isDeleted: false,
      }
    })

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  public static async checkUserIsEventOrganizer(eventId: string) {
    if (!eventId || eventId.trim().length < 1) {
      throw new Error("Event id is undefined");
    }

    const session = await getServerSession();

    if(!session || !session?.user?.email){
      throw new Error("You must be signed in to create an event");
    }

    const email = session.user.email;

    if (!email || email.trim().length < 1) {
      throw new Error("User email is undefined");
    }

    await UserValidator.checkUserExistsByEmail(email);
    await EventValidator.checkEventExists(eventId);

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        isDeleted: false,
        organizer: {
          email: email
        }
      }
    })

    if (!event) {
      throw new Error("You are not the organizer of this event");
    }

    return event;
  }

}