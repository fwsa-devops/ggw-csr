import logger from "@/lib/logger";
import { CommonValidator } from "./core-validator";
import * as EventDAO from "@/server/dao/event.dao";
import { Exception } from "../exceptions/exception";
import { UserValidator } from "./user.validator";
import * as HostDAO from "../dao/host.dao";
import { DateTime } from "luxon";

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
      const event = await EventDAO.findOne(eventId);
      if (!event) {
        throw Exception.EVENT_NOT_FOUND("Event not found");
      }
      const dateTime = DateTime.local().toJSDate()
      if( event.endTime < dateTime ){
        throw Exception.THROW("Event has expired")
      }
      return !!event?.isActive;
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
      await UserValidator.isValidId(userId);
      await EventValidator.isValidId(eventId);
      const isHost = await HostDAO.findOne(eventId, userId);
      if (!isHost) {
        throw Exception.UNAUTHORIZED("User does not have access");
      }
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async hasAccessBoolean(eventId: string, userId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(eventId);
      CommonValidator.ID(userId);
      await UserValidator.isValidId(userId);
      await EventValidator.isValidId(eventId);
      const isHost = await HostDAO.findOne(eventId, userId);
      return !!isHost;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async isValidLocationId(locationId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(locationId);
      const Location = await EventDAO.findLocation(locationId);

      if (!Location) {
        throw Exception.LOCATION_NOT_FOUND("Location not found");
      }
      return Location;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async isValidAddressId(addressId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(addressId);
      const Address = await EventDAO.findAddress(addressId);

      if (!Address) {
        throw Exception.ADDRESS_NOT_FOUND("Address not found");
      }
      return Address;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }
}
