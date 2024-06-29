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

export async function findByEmail(email: string) {
  try {
    logger.info("EventService.findMany");
    logger.debug("Email", email);
    const events = await db.user.findFirst({
      where: {
        email:email
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

export async function create(data: {
  email: string;
  name: string;
  image?: string | null;
}) {
  try {
    logger.info("UserDAO.create");
    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        image: data.image,
      },
    });
    return user;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function search(query: string) {
  try {
    logger.info("UserDAO.search");
    const users = await db.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
      },
    });

    return users;
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    throw error;
  }
}
