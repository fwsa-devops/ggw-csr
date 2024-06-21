import logger from "@/lib/logger";
import { CommonValidator } from "./core-validator";
import * as EventDAO from "@/server/dao/event.dao";
import { Exception } from "../exceptions/exception";
import { UserValidator } from "./user.validator";

export class EventValidator {
  public static async isValidId(eventId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(eventId);
      const user = await EventDAO.findOne(eventId);
      if (!user) {
        throw Exception.EVENT_NOT_FOUND("Event not found");
      }
      return user;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async isValidSlug(slug: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.INPUT("Slug", slug);
      const user = await EventDAO.findBySlug(slug);
      if (!user) {
        throw Exception.EVENT_NOT_FOUND("Event not found");
      }
      return user;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async isActive(eventId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(eventId);
      const user = await EventDAO.findOne(eventId);
      if (!user) {
        throw Exception.EVENT_NOT_FOUND("Event not found");
      }
      return !!user?.isActive;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async hasAccess(eventId: string, userId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(eventId);
      CommonValidator.ID(userId);
      const user = await UserValidator.isValidId(userId);
      const event = await EventValidator.isValidId(eventId);
      const isHost = event.User.some((host) => host.id === user.id);
      return isHost;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }
  

}
