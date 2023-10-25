'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function joinEvent(eventId: string) {
  const session = await getServerSession();

  try {
    if (
      session?.user?.email === undefined ||
      !(session?.user?.email && /^\S+freshworks\.com$/.test(session?.user?.email))
    ) {
      throw ('Not part of Freshworks')
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
      throw ('Un-Authorized User');
    }

    await prisma.volunteers.create({
      data: {
        event_id: eventId,
        user_id: user.email,
      },
    });

    revalidatePath(`/activities/${eventId}`, 'page');
    return {
      message: 'Successfully Joined Event'
    }

  } catch (e: any) {
    console.log(e)
    return {
      message: e
    }
  }
}

export async function unJoinEvent(eventId: string) {
  const session = await getServerSession();

  try {
    if (session?.user?.email === undefined) {
      throw ('Not authorized session');
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
      throw ('Not authorized');
    }

    await prisma.volunteers.deleteMany({
      where: {
        event_id: eventId,
        user_id: user.email,
      },
    });

    revalidatePath(`/activities/${eventId}`, 'page')

    return {
      message: 'Successfully Unjoined Event'
    }
  } catch (e: any) {
    console.log(e)
    return {
      message: e
    }
  }

}