import prisma from '@/lib/prisma';
import { EventValidator } from './events.validator';
import { UserValidator } from './user.validator';
import { findById } from '../service/event.service';
import { getServerSession } from 'next-auth';

export class RegistrationValidator {
  public static async checkRegistrationExists(eventId: string, email: string) {
    if (!eventId || eventId.trim().length < 1) {
      throw new Error('Event id is undefined');
    }

    if (!email || email.trim().length < 1) {
      throw new Error('User id is undefined');
    }

    await UserValidator.checkUserExistsByEmail(email);
    await EventValidator.checkEventExists(eventId);

    const isAlreadyRegistration = await prisma.registration.findFirst({
      where: {
        eventId: eventId,
        user: {
          email: email,
        },
      },
      select: {
        id: true,
      },
    });

    console.log('isAlreadyRegistration', isAlreadyRegistration);

    return !!isAlreadyRegistration;
  }

  public static async validateRegistration(eventId: string) {
    if (!eventId || eventId.trim().length < 1) {
      throw new Error('Event id is undefined');
    }
    await EventValidator.checkEventExists(eventId);
    const event = await findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const now = new Date();
    if (event.startDateTime && event.startDateTime < now) {
      throw new Error('Event has already started');
    }

    if (event.endDateTime && event.endDateTime < now) {
      throw new Error('Event has already ended');
    }

    const existingRegistrations = await prisma.registration.count({
      where: {
        eventId: eventId,
        registrationStatus: 'APPROVED',
      },
    });

    if (event.capacity > 0 && existingRegistrations >= event.capacity) {
      throw new Error('Event is at capacity, no more registrations allowed');
    }

    const session = await getServerSession();
    await UserValidator.checkUserExistsByEmail(session?.user?.email);

    const isAlreadyRegistration =
      await RegistrationValidator.checkRegistrationExists(
        eventId,
        session?.user?.email as string,
      );

    if (isAlreadyRegistration) {
      throw new Error('You are already registered for this event');
    }
  }
}
