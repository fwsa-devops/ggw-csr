import logger from "@/lib/logger";
import { CommonValidator } from "./core-validator";
import { EventValidator } from "./event.validator";
import { findOne } from "@/server/dao/participant.dao";

export class ParticipantValidator {
  public static async isParticipant(eventId: string, userId: string) {
    try {
      logger.info("ParticipantValidator.isParticipant");
      CommonValidator.ID(eventId);
      CommonValidator.ID(userId);
      await EventValidator.isValidId(eventId);
      const participant = await findOne(eventId, userId);
      return !!participant;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async hasCheckedIn(eventId: string, userId: string) {
    try {
      logger.info("ParticipantValidator.hasCheckedIn");
      CommonValidator.ID(eventId);
      CommonValidator.ID(userId);
      await EventValidator.isValidId(eventId);
      const participant = await findOne(eventId, userId);
      return participant?.checkedIn;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

}
