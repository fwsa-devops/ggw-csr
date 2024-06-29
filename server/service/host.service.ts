"use server";

import logger from "@/lib/logger";
import { EventValidator } from "../validators/event.validator";
import * as HostDAO from "../dao/host.dao";
import { IResponse } from "../types";
import { UserValidator } from "../validators/user.validator";
import { isException } from "../exceptions/exception";

export async function findMany(eventId: string) {
  try {
    logger.info("HostDAO.findMany");
    await EventValidator.isValidId(eventId);
    const hosts = await HostDAO.findMany(eventId);
    const users = hosts.map((host) => host.User);
    return IResponse.toJSON(200, "Hosts found", users);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
   if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function findOne(eventId: string, userId: string) {
  try {
    logger.info("HostDAO.findOne");
    await EventValidator.isValidId(eventId);
    await UserValidator.isValidId(userId);
    const host = await HostDAO.findOne(eventId, userId);
    return IResponse.toJSON(200, "Host found", host);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function create(eventId: string, userId: string) {
  try {
    logger.info("HostDAO.create");
    await EventValidator.isValidId(eventId);
    await UserValidator.isValidId(userId);
    const host = await HostDAO.create(eventId, userId);
    return IResponse.toJSON(200, "Host created", host);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function remove(eventId: string, userId: string) {
  try {
    logger.info("HostDAO.remove");
    await EventValidator.isValidId(eventId);
    await UserValidator.isValidId(userId);
    await HostDAO.remove(eventId, userId);
    return IResponse.toJSON(200, "Host removed", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function hasAccess(eventId: string, userId: string) {
  try {
    logger.info("HostDAO.hasAccess");
    await UserValidator.isValidId(userId);
    await EventValidator.isValidId(eventId);
    const host = await EventValidator.hasAccess(eventId, userId);
    return IResponse.toJSON(200, "User has access", host);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}
