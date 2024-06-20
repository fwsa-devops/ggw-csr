"use server";

import logger from "@/lib/logger";
import { db } from "../db";

export async function findById(userId: string) {
  try {
    logger.info("EventService.findMany");
    const events = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true, 
        email: true,
        name: true,
        image: true, 
        createdAt: true,
      },
    });

    return events;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}


export async function findByEmail(userId: string) {
  try {
    logger.info("EventService.findMany");
    const events = await db.user.findFirst({
      where: {
        email: userId,
      },
      select: {
        id: true, 
        email: true,
        name: true,
        image: true, 
        createdAt: true,
      },
    });

    return events;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}
