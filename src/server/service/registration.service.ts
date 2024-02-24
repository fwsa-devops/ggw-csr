import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { RegistrationValidator } from '../validation/registration.validator';
import { EventValidator } from '../validation/events.validator';
import { UserValidator } from '../validation/user.validator';
import { registeredEventEmail } from './email.service';

export async function registerEvent(eventId: string) {
  try {
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      throw new Error('You must be signed in to register for an event');
    }

    const user = await UserValidator.checkUserExistsByEmail(session.user.email);
    const event = await EventValidator.checkEventExists(eventId);

    console.log('RegistrationDao.register', eventId, session.user.email);

    await RegistrationValidator.validateRegistration(eventId);
    const registration = await prisma.registration.create({
      data: {
        event: {
          connect: {
            id: event.id,
          },
        },
        user: {
          connect: {
            email: user.email,
          },
        },
      },
      select: {
        id: true,
        registrationStatus: true,
        userStatus: true,
      },
    });

    // await registeredEventEmail(user, event);

    return registration;
  } catch (error: any) {
    console.log(error);
    throw new Error(error['message'] || error);
  }
}

export async function unregisterEvent(eventId: string) {
  try {
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      throw new Error('You must be signed in to unregister for an event');
    }

    await RegistrationValidator.checkRegistrationExists(
      eventId,
      session.user.email,
    );

    const registration = await prisma.registration.deleteMany({
      where: {
        eventId: eventId,
        user: {
          email: session.user.email,
        },
      },
    });

    return registration;
  } catch (error: any) {
    throw new Error(error['message'] || error);
  }
}

export async function findAllRegistrations(eventId: string) {
  try {
    await EventValidator.checkEventExists(eventId);
    const registrations = await prisma.registration.findMany({
      where: {
        event: {
          id: eventId,
          isDeleted: false,
        },
      },
      select: {
        id: true,
        registrationStatus: true,
        userStatus: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return registrations;
  } catch (error: any) {
    throw new Error(error['message'] || error);
  }
}

export async function findAllUserRegistrations(email: string) {
  try {
    await UserValidator.checkUserExistsByEmail(email);

    const registrations = await prisma.event.findMany({
      where: {
        isDeleted: false,
        startDateTime: {
          gte: new Date(),
        },
        Registration: {
          every: {
            user: {
              email: email,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        startDateTime: true,
        endDateTime: true,
        capacity: true,
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        startDateTime: 'asc',
      },
    });

    return registrations;
  } catch (error: any) {
    throw new Error(error['message'] || error);
  }
}
