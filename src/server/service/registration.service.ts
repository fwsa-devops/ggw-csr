import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { RegistrationValidator } from "../validation/registration.validator";

export default async function registerEvent(eventId:string) {
  try {
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      throw new Error("You must be signed in to register for an event");
    }

    console.log("RegistrationDao.register", eventId, session.user.email);

    await RegistrationValidator.validateRegistration(eventId);
    const registration = await prisma.registration.create({
      data: {
        event: {
          connect: {
            id: eventId
          }
        },
        user: {
          connect: {
            email: session.user.email
          }
        }
      },select:{
        id: true,
        registrationStatus: true,
        userStatus: true,
      }
    });
    return registration;
  }
  catch (error: any) {
    console.log(error);
    throw new Error(error['message'] || error);
  }
}