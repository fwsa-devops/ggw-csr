"use server";

import logger from "@/lib/logger";
import { db } from "../db";
import { type Prisma } from "@prisma/client";
import { IResponse } from "../types";

export async function eventFilter(filter: {
  search: string;
  city: string;
  date: Date;
  past: boolean;
}) {
  try {
    logger.info("EventService.filter");

    const filterQuery: Prisma.EventWhereInput = {};

    if (filter.search?.trim() !== "") {
      filterQuery.title = {
        contains: filter.search.trim(),
        mode: "insensitive",
      };
    }

    if (filter.city?.trim() !== "") {
      filterQuery.Address = {
        city: {
          contains: filter.city.trim(),
          mode: "insensitive",
        },
      };
    }

    const events = await db.event.findMany({
      where: {
        isPublic: true,
        AND: [filterQuery],
        OR: [
          {
            endTime: !filter.past
              ? {
                  gte: filter.date,
                }
              : {
                  lte: filter.date,
                },
          },
        ],
      },
      select: {
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
      },
      orderBy: {
        startTime: !!filter.past ? "desc" : "asc",
      },
    });

    return IResponse.toJSON(200, "Events found", events);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function cityList() {
  try {
    logger.info("EventService.cityList");

    const cityList = await db.address.findMany({
      select: {
        city: true,
      },
      distinct: ["city"],
      orderBy: {
        city: "asc",
      },
    });

    const response = cityList.map((city) => city.city);
    return IResponse.toJSON(200, "City list found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function getAllEventSlugs() {
  try {
    logger.info("EventService.eventSlugs");
    const slugs = await db.event.findMany({
      select: {
        slug: true,
      },
    });
    const response = slugs.map((slug) => slug.slug);
    return IResponse.toJSON(200, "Slugs found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    return IResponse.toJSON(500, "Internal server error", null);
  }
}

export async function eventsByCity(city: string) {
  try {
    logger.info("EventService.eventsByCity");
    const address = await db.address.findMany({
      where: {
        city: city,
      },
      include: {
        _count: true,
      },
    });

    logger.info(address);

    const response = { location: city, count: (address ?? []).length };
    return IResponse.toJSON(200, "Slugs found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    return IResponse.toJSON(500, "Internal server error", null);
  }
}
