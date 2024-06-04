/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use server";

import logger from "@/lib/logger";
import * as ParticipantDAO from "@/server/dao/participant.dao";
import { CommonValidator } from "../validators/core-validator";
import { IResponse } from "../types";
import { Exception } from "../exceptions/exception";
import { SessionValidator } from "../validators/session.validator";

export async function findMany(eventId: string) {
  try {
    logger.info("ParticipantsService.findMany");
    CommonValidator.INPUT("Event Id", eventId);
    const response = await ParticipantDAO.findMany(eventId);
    return IResponse.toJSON(200, "Participants found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (error instanceof Exception) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function findOne(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.findOne");
    CommonValidator.INPUT("Event Id", eventId);
    CommonValidator.INPUT("User Id", userId);
    const response = await ParticipantDAO.findOne(eventId, userId);
    return IResponse.toJSON(200, "Participant found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (error instanceof Exception) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function create(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.create");
    CommonValidator.INPUT("Event Id", eventId);
    CommonValidator.INPUT("User Id", userId);
    const isAlreadyParticipant = await isParticipant(eventId);

    if (isAlreadyParticipant.data) {
      return IResponse.toJSON(400, "Participant already exists", null);
    }

    const response = await ParticipantDAO.create(eventId, userId);
    return IResponse.toJSON(201, "Participant created", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (error instanceof Exception) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function remove(eventId: string, userId: string) {
  try {
    logger.info("ParticipantsService.remove");
    CommonValidator.INPUT("Event Id", eventId);
    CommonValidator.INPUT("User Id", userId);

    const isAlreadyParticipant = await isParticipant(eventId);
    if (!isAlreadyParticipant.data) {
      return IResponse.toJSON(400, "Participant does not exist", null);
    }

    const response = await ParticipantDAO.remove(eventId, userId);
    return IResponse.toJSON(204, "Participant removed", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (error instanceof Exception) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function isParticipant(eventId: string) {
  try {
    logger.info("ParticipantsService.isParticipant");
    const { id } = await SessionValidator.validateSession();
    CommonValidator.INPUT("Event Id", eventId);
    CommonValidator.INPUT("User Id", id);
    const response = await ParticipantDAO.findOne(eventId, id);
    return IResponse.toJSON(200, "Participant found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (error instanceof Exception) {
      return IResponse.toJSON(error.code, error.message, error.description);
    }

    return IResponse.toJSON(500, "Internal server error", null);
  }
}
