/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use server";

import logger from "@/lib/logger";
import * as ParticipantDAO from "@/server/dao/participant.dao";
import { IResponse } from "../types";
import { isException } from "../exceptions/exception";
import { SessionValidator } from "../validators/session.validator";
import { EventValidator } from "../validators/event.validator";
import { UserValidator } from "../validators/user.validator";
import { ParticipantValidator } from "../validators/participant.validator";

export async function findMany(eventId: string) {
  try {
    logger.info("ParticipantsService.findMany");
    await EventValidator.isValidId(eventId);
    const response = await ParticipantDAO.findMany(eventId);
    return IResponse.toJSON(200, "Participants found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error))
      return IResponse.toJSON(error.code, error.message, error.description);
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function findOne(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.findOne");
    await EventValidator.isValidId(eventId);
    await UserValidator.isValidId(userId);
    const response = await ParticipantDAO.findOne(eventId, userId);
    return IResponse.toJSON(200, "Participant found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error))
      return IResponse.toJSON(error.code, error.message, error.description);
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function create(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.create");
    await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await EventValidator.isActive(eventId);
    await UserValidator.isValidId(userId);
    const isAlreadyParticipant = await ParticipantValidator.isParticipant(
      eventId,
      userId,
    );
    if (isAlreadyParticipant)
      return IResponse.toJSON(400, "Participant already exists", null);
    const areSeatsAvailable =
      await ParticipantValidator.areSeatsAvailable(eventId);

    if (!areSeatsAvailable)
      return IResponse.toJSON(400, "Seats are full", null);

    const response = await ParticipantDAO.create(eventId, userId);
    return IResponse.toJSON(201, "Participant created", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error))
      return IResponse.toJSON(error.code, error.message, error.description);
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function remove(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.remove");
    await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await EventValidator.isActive(eventId);
    await UserValidator.isValidId(userId);
    const isAlreadyParticipant = await ParticipantValidator.isParticipant(
      eventId,
      userId,
    );
    if (!isAlreadyParticipant) {
      return IResponse.toJSON(400, "Participant does not exist", null);
    }
    const response = await ParticipantDAO.remove(eventId, userId);
    return IResponse.toJSON(204, "Participant removed", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function isParticipant(eventId: string) {
  try {
    logger.info("ParticipantsService.isParticipant");
    const { id } = await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    const response = await ParticipantValidator.isParticipant(eventId, id);
    if (!response)
      return IResponse.toJSON(400, "User is not a participant", null);
    return IResponse.toJSON(200, "Participant found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function exportParticipants(eventId: string) {
  try {
    logger.info("ParticipantsService.exportParticipants");
    await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    const response = await ParticipantDAO.findMany(eventId);
    return IResponse.toJSON(200, "Participants exported", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function participantCheckIn(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.checkInParticipant");
    await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await UserValidator.isValidId(userId);

    const isParticipant = await ParticipantValidator.isParticipant(
      eventId,
      userId,
    );
    if (!isParticipant)
      return IResponse.toJSON(400, "Participant not registered", null);

    const isAlreadyCheckedIn = await ParticipantValidator.hasCheckedIn(
      eventId,
      userId,
    );
    if (isAlreadyCheckedIn)
      return IResponse.toJSON(400, "Participant already checked in", null);

    const response = await ParticipantDAO.checkIn(eventId, userId);
    return IResponse.toJSON(200, "Participant checked in", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function participantCount(eventId: string) {
  try {
    logger.info("ParticipantsService.checkInParticipant");
    await EventValidator.isValidId(eventId);
    const response = await ParticipantDAO.count(eventId);
    return IResponse.toJSON(200, "Participant checked in", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function seatsAvailable(eventId: string) {
  try {
    logger.info("ParticipantValidator.areSeatsAvailable");
    await EventValidator.isValidId(eventId);
    const response = await ParticipantValidator.areSeatsAvailable(eventId);
    return IResponse.toJSON(200, "Participation is Available", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }
    return IResponse.toJSON(500, "Internal server error", null);
  }
}
