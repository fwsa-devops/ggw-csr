/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import logger from "@/lib/logger";
import { db } from "../db";
import { type IEvent, type INewEvent } from "../model";
import { type IEvent, type INewEvent } from "../model";
import { generateId } from "@/lib/utils";

export async function findMany() {
  try {
    logger.info("EventService.findMany");
    const events = await db.event.findMany({
      where: {
        isPublic: true,
        OR: [
          {
            endTime: {
              gte: new Date(),
            },
          },
          {
            startTime: {
              lte: new Date(),
            },
          },
        ],
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        image: true,
        title: true,
        description: true,
        maxParticipants: true,
        isPublic: true,
        startTime: true,
        endTime: true,
        timezone: true,
        Address: true,
        Location: true,
        EventHost: {
          select: {
            User: true,
          },
        },
        isParticipationOpen: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    const transformedEvent: IEvent[] = events.map((event) => ({
      ...event,
      User: event.EventHost.map((host) => host.User),
    }));

    return transformedEvent;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findOne(id: string) {
  try {
    logger.info("EventService.findOne");
    logger.debug(`Event Id: ${id}`);
    const event = await db.event.findUnique({
      where: {
        id: id,
        isActive: true,
        isPublic: true,
      },
      select: {
        id: true,
        image: true,
        title: true,
        description: true,
        maxParticipants: true,
        isPublic: true,
        startTime: true,
        endTime: true,
        timezone: true,
        Address: true,
        Location: true,
        EventHost: {
          select: {
            User: true,
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    const transformedEvent: IEvent = {
      ...event,
      User: event?.EventHost.map((host) => host.User),
      slug: "",
      isParticipationOpen: false,
    };

    return transformedEvent;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findBySlug(slug: string) {
  try {
    logger.info("EventService.findOne");
    logger.debug(`Event Id: ${slug}`);
    const event = await db.event.findUnique({
      where: {
        slug: slug,
        isActive: true,
        isPublic: true,
      },
      select: {
        id: true,
        slug: true,
        image: true,
        title: true,
        description: true,
        maxParticipants: true,
        isPublic: true,
        startTime: true,
        endTime: true,
        timezone: true,
        Location: true,
        Address: true,
        isParticipationOpen: true,
        EventHost: {
          select: {
            User: true,
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    const transformedEvent: IEvent = {
      ...event,
      User: event?.EventHost.map((host) => host.User),
    };

    return transformedEvent;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function create(email: string, data: INewEvent) {
  try {
    logger.info("EventDAO.create");
    const response = await db.event.create({
      data: {
        slug: generateId(),
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        timezone: data.timezone,
        image: data.image,
        Location: {
          create: {
            address: data.location.address,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
        },
        Address: {
          create: {
            name: data.address.name ?? null,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            country: data.address.country,
            zipcode: data.address.zip,
          },
        },
        EventHost: {
          create: {
            User: {
              connect: {
                email,
              },
            },
          },
        },
        maxParticipants: data.maxParticipants,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function addHost(eventId: string, userId: string) {
  try {
    logger.info("EventDAO.addHost");
    const response = await db.eventHost.create({
      data: {
        eventId: eventId,
        userId: userId,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}
