import logger from "@/lib/logger";
import { db } from "../db";

export async function findMany(eventId: string) {
  try {
    logger.info("HostDAO.findMany");
    const hosts = await db.eventHost.findMany({
      where: {
        eventId: eventId,
      },
      select: {
        eventId: true,
        userId: true,
        User: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return hosts;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findOne(
  eventId: string,
  userId: string,
  options?: { includeInActive?: boolean, includePrivate?: boolean },
) {
  try {
    logger.info("HostDAO.findOne");
    const host = await db.eventHost.findUnique({
      where: {
        hostId: {
          eventId: eventId,
          userId: userId,
        },
      },
      select: {
        eventId: true,
        userId: true,
        User: true,
      },
    });

    return host;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function create(eventId: string, userId: string) {
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

export async function remove(eventId: string, userId: string) {
  try {
    logger.info("EventDAO.removeHost");
    const response = await db.eventHost.delete({
      where: {
        hostId: {
          eventId: eventId,
          userId: userId,
        },
      },
    });
    return response;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

// TODO: Implement update function in future
