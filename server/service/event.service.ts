/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { SessionValidator } from "./../validators/session.validator";
import * as ParticipantService from "./participant.service";
import * as EventDAO from "./../dao/event.dao";
import * as HostDAO from "@/server/dao/host.dao";
import { IResponse } from "../types";
import { isException } from "../exceptions/exception";
import { type INewEvent } from "../model";
import { type Event } from "@prisma/client";
import logger from "@/lib/logger";
import { EventValidator } from "../validators/event.validator";
import { CommonValidator } from "../validators/core-validator";
import { UserValidator } from "../validators/user.validator";
import { revalidatePath } from "next/cache";

export async function findMany() {
  try {
    logger.info("EventService.findMany");
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
    // CommonValidator.INPUT("Latitude", formDate.location.latitude);
    // CommonValidator.INPUT("Longitude", formDate.location.longitude);

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

export async function findById(id: string) {
  try {
    logger.info("EventService.findBySlug");
    await EventValidator.isValidId(id);
    const response = await EventDAO.findOne(id);
    if (!response) return IResponse.toJSON<null>(404, "Event not found", null);
    return IResponse.toJSON(200, "Events found", response);
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
    await EventValidator.isValidSlug(slug);
    const response = await EventDAO.findBySlug(slug);
    if (!response) return IResponse.toJSON<null>(404, "Event not found", null);
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
    await EventValidator.isValidSlug(slug);

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
    const event = await EventValidator.isValidSlug(slug);
    await EventValidator.hasAccess(event.id, session.id);

    return IResponse.toJSON(200, "User has access", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function addHost(eventSlug: string, newHostEmail: string) {
  try {
    logger.info("EventService.addHost");
    logger.info("eventSlug", eventSlug);
    logger.info("newHostEmail", newHostEmail);
    const session = await SessionValidator.validateSession();
    const event = await EventValidator.isValidSlug(eventSlug);
    const user = await UserValidator.isValidEmail(newHostEmail);
    await EventValidator.hasAccess(event.id, session.id);
    const alreadyExists = await EventValidator.hasAccessBoolean(
      event.id,
      user.id,
    );
    if (alreadyExists) IResponse.toJSON<null>(409, "Already Exists", null);
    await HostDAO.create(event.id, user.id);
    return IResponse.toJSON(200, "Host added", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function removeHost(eventId: string, hostId: string) {
  try {
    logger.info("EventService.removeHost");
    await SessionValidator.validateSession();
    const event = await EventValidator.isValidSlug(eventId);
    const user = await UserValidator.isValidId(hostId);
    await EventValidator.hasAccess(eventId, hostId);
    await HostDAO.remove(event.id, user.id);
    return IResponse.toJSON(200, "Host removed", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function updateBasic(
  eventId: string,
  formData: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    timezone: string;
  },
) {
  try {
    logger.info("EventService.updateBasic");
    const user = await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await EventValidator.hasAccess(eventId, user.id);
    const response = await EventDAO.updateBasic(eventId, formData);
    revalidatePath(`/${eventId}`, "page");
    return IResponse.toJSON<Event>(200, "Event updated", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function updateLocation(
  eventId: string,
  formData: {
    location: {
      id: string;
      address: string;
      latitude: number;
      longitude: number;
    };
    address: {
      id: string;
      name: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
    };
  },
) {
  try {
    logger.info("EventService.updateLocation");
    const user = await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await EventValidator.hasAccess(eventId, user.id);
    await EventValidator.isValidLocationId(formData.location.id);
    await EventValidator.isValidAddressId(formData.address.id);
    await EventDAO.updateLocation(formData.location.id, formData.location);
    await EventDAO.updateAddress(formData.address.id, formData.address);
    return IResponse.toJSON(200, "Event updated", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function updateImage(eventId: string, url: string) {
  try {
    logger.info("EventService.updateImage");
    CommonValidator.URL(url);
    const user = await SessionValidator.validateSession();
    await EventValidator.isValidId(eventId);
    await EventValidator.hasAccess(eventId, user.id);
    await EventDAO.updateImage(eventId, url);
    return IResponse.toJSON(200, "Event Image Updated", null);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error)) {
      return IResponse.toJSON<null>(error.code, error.message, null);
    }
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}
