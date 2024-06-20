"use server";

import logger from "@/lib/logger";
import { IResponse } from "../types";
import { CommonValidator } from "../validators/core-validator";
import { db } from "../db";
import { isException } from "../exceptions/exception";

export async function userCreatedEvent(userId: string) {
  try {
    logger.info("EventService.useCreatedEvent");
    CommonValidator.INPUT("User Id", userId);

    const whereQuery = {
      EventHost: {
        some: {
          userId: userId,
        },
      },
      isActive: true,
    };
    const selectQuery = {
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
      _count: true,
    };

    const response = await db.event.findMany({
      where: whereQuery,
      select: selectQuery,
      orderBy: {
        startTime: "desc",
      },
    });
    return IResponse.toJSON(200, "Events found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function userRegisteredEvent(userId: string) {
  try {
    logger.info("EventService.userRegisteredEvent");
    CommonValidator.INPUT("User Id", userId);
    const whereQuery = {
      EventParticipant: {
        some: {
          userId: userId,
        },
      },
      isActive: true,
    };
    const selectQuery = {
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
      _count: true,
    };

    const response = await db.event.findMany({
      where: whereQuery,
      select: selectQuery,
      orderBy: {
        startTime: "desc",
      },
    });
    return IResponse.toJSON(200, "Events found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}
