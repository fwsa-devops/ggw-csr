
import prisma from "@/lib/prisma";
import { TCreateEventFormSchema, createEventFormSchema } from "@/lib/schema/event.schema";

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

    if (!event.end_date_time) {
      throw new Error("Event end date is undefined");
    }

    if (new Date(event.start_date_time) > new Date(event.end_date_time)) {
      throw new Error("Event start date is greater than end date");
    }

    const result = createEventFormSchema.safeParse(event);

    if(!result.success){
      throw new Error(result.error.message);
    }

  }

  public static async checkEventExists(eventId: string) { 
    if (!eventId || eventId.trim().length < 1) {
      throw new Error("Event id is undefined");
    }

    const event = await prisma.event.findUnique({
      where:{
        id: eventId
      }
    })

    if(!event){
      throw new Error("Event not found");
    }

    return event;
  }

}