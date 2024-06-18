/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import logger from "./../../lib/logger";
import { SessionValidator } from "./../validators/session.validator";
import * as EventDAO from "./../dao/event.dao";
import * as ParticipantService from "./participant.service";
import { IResponse } from "../types";
import { isException } from "../exceptions/exception";
import { IEvent, type INewEvent } from "../model";
import { CommonValidator } from "../validators/core-validator";
import { type Event } from "@prisma/client";

export async function findMany() {
  try {
    logger.info("EventService.findMany");
    // await SessionValidator.validateSession();
    const response = await EventDAO.findMany();

    return IResponse.toJSON(200, "Events found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }

    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function create(formDate: INewEvent) {
  try {
    logger.info("EventService.create");
    const { email } = await SessionValidator.validateSession();

    CommonValidator.INPUT("Title", formDate.title);
    CommonValidator.INPUT("Description", formDate.description);
    CommonValidator.INPUT("Start", formDate.startTime);
    CommonValidator.INPUT("End", formDate.endTime);
    CommonValidator.INPUT("Timezone", formDate.timezone);
    CommonValidator.INPUT("Image", formDate.image);

    CommonValidator.INPUT("Location", formDate.location.address);
    CommonValidator.INPUT("Latitude", formDate.location.latitude);
    CommonValidator.INPUT("Longitude", formDate.location.longitude);

    CommonValidator.INPUT("Address", formDate.address.street);
    CommonValidator.INPUT("City", formDate.address.city);
    CommonValidator.INPUT("State", formDate.address.state);
    CommonValidator.INPUT("Country", formDate.address.country);
    CommonValidator.INPUT("ZipCode", formDate.address.zip);

    // CommonValidator.INPUT("Max Participants", formDate.maxParticipants);

    const response = await EventDAO.create(email, formDate);
    return IResponse.toJSON<Event>(
      201,
      "Event created",
      response as unknown as Event,
    );
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function findBySlug(slug: string) {
  try {
    logger.info("EventService.findBySlug");
    CommonValidator.INPUT("Slug", slug);

    const response = await EventDAO.findBySlug(slug);
    return IResponse.toJSON(200, "Events found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }

    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function eventDetails(slug: string) {
  try {
    logger.info("EventService.eventDetails");
    CommonValidator.INPUT("Event Slug", slug);

    const { data: event } = await findBySlug(slug);
    if (!event) {
      return IResponse.toJSON<null>(404, "Event not found", null);
    }

    const participants = await ParticipantService.findMany(event.id);
    const isParticipant = await ParticipantService.isParticipant(event.id);

    const response = {
      event: event as unknown as Event,
      location: event.Location,
      Address: event.Address,
      createdBy: event.User,
      participants: participants.data,
      isParticipant: !!isParticipant.data,
    };

    return IResponse.toJSON(200, "Event details found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }

    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function hasAccess(slug: string) {
  try {
    logger.info("EventService.hasAccess");
    const session = await SessionValidator.validateSession();

    if (!session) {
      return IResponse.toJSON<null>(401, "User not authenticated", null);
    }

    const { data: event } = await findBySlug(slug);

    if (!event) {
      return IResponse.toJSON<null>(404, "Event not found", null);
    }

    if (event.User.id !== session.id) {
      return IResponse.toJSON<null>(403, "User does not have access", null);
    }

    return IResponse.toJSON(200, "User has access", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));

    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }

    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}