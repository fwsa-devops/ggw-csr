/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import logger from "@/lib/logger";
import { db } from "../db";
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
        isActive: true,
        slug: true,
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
        isActive: true,
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

export async function updateBasic(
  eventId: string,
  data: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    timezone: string;
  },
) {
  try {
    logger.info("EventDAO.updateBasic");
    const response = await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        timezone: data.timezone,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findLocation(locationId: string) {
  try {
    logger.info("EventDAO.findLocation");
    const response = await db.location.findUnique({
      where: {
        id: locationId,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function updateLocation(
  locationId: string,
  data: { id: string; address: string; latitude: number; longitude: number },
) {
  try {
    logger.info("EventDAO.updateLocation");
    const response = await db.location.update({
      where: {
        id: locationId,
      },
      data: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findAddress(addressId: string) {
  try {
    logger.info("EventDAO.findAddress");
    const response = await db.address.findUnique({
      where: {
        id: addressId,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function updateAddress(
  addressId: string,
  data: {
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  },
) {
  try {
    logger.info("EventDAO.updateAddress");
    const response = await db.address.update({
      where: {
        id: addressId,
      },
      data: {
        name: data.name,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}
