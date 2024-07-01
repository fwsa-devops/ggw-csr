/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import logger from "@/lib/logger";
import { db } from "../db";

export async function findMany(eventId: string) {
  try {
    logger.info("ParticipantsDAO.findMany");
    const participants = await db.eventParticipant.findMany({
      where: {
        eventId: eventId,
      },
      select: {
        eventId: true,
        userId: true,
        User: true,
        checkedIn: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return participants;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function findOne(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsDAO.findOne");
    const participant = await db.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: userId,
        },
      },
      select: {
        eventId: true,
        userId: true,
        User: true,
        checkedIn: true,
      },
    });

    return participant;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function create(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsDAO.create");
    const participant = await db.eventParticipant.create({
      data: {
        eventId: eventId,
        userId: userId,
      },
    });

    return participant;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function remove(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsDAO.remove");
    const participant = await db.eventParticipant.delete({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: userId,
        },
      },
    });

    return participant;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function checkIn(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsDAO.checkIn");
    const participant = await db.eventParticipant.update({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: userId,
        },
      },
      data: {
        checkedIn: true,
      },
    });

    return participant;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function checkOut(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsDAO.checkIn");
    const participant = await db.eventParticipant.update({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: userId,
        },
      },
      data: {
        checkedIn: false,
      },
    });

    return participant;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function count(eventId: string) {
  try {
    logger.info("ParticipantsDAO.count");
    const participantsCount = await db.eventParticipant.count({
      where: {
        eventId: eventId,
      },
    });

    return participantsCount;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}
