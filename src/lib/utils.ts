/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";
import shortId from "short-unique-id";
import { type IEvent } from "@/server/model";
import Cryptr from "cryptr";
import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timezones() {
  const timezones = (Intl as unknown as any).supportedValuesOf("timeZone");
  return timezones as string[];
}

export function generate30MinuteIntervals(startTime?: string) {
  const intervals = [];
  let start = DateTime.fromFormat(startTime ?? "12:00 AM", "hh:mm a");
  const endOfDay = start.endOf("day");
  while (start < endOfDay) {
    start = start.plus({ minutes: 30 });
    intervals.push(start.toFormat("hh:mm a"));
  }
  return intervals;
}

export function generateId() {
  const { randomUUID } = new shortId({ length: 7 });
  return randomUUID();
}

export function createGoogleCalendarLink(event: IEvent) {
  const extractContent = (s: string) => {
    return s.replace(/<[^>]*(>|$)| |‌|»|«|>/g, " ").replace(/ +/g, " ");
  };

  const startDate = DateTime.fromJSDate(event.startTime)
    .setZone(event.timezone)
    .toFormat("yyyyMMdd'T'HHmmss");
  const endDate = DateTime.fromJSDate(event.endTime)
    .setZone(event.timezone)
    .toFormat("yyyyMMdd'T'HHmmss");

  const description = `${extractContent(event.description)}
  
Location: ${event.Address.street} ${event.Address.city}, ${event.Address.state}, ${event.Address.country} ${event.Address.zipcode}
  `;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", event.title);
  url.searchParams.append("details", description);
  url.searchParams.append("dates", `${startDate}/${endDate}`);
  url.searchParams.append("ctz", event.timezone);

  return url.toString();
}

export function extractAddress(
  addressComponents: google.maps.GeocoderAddressComponent[],
) {
  const address = {
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  };

  addressComponents.forEach((component) => {
    if (component.types.includes("premise")) {
      address.name += ` ${component.long_name}`;
    }

    if (component.types.includes("street_number")) {
      address.street += ` ${component.long_name}`;
    }

    if (component.types.includes("sublocality")) {
      address.street += `, ${component.long_name}`;
    }

    if (component.types.includes("route")) {
      address.street += ` ${component.long_name}`;
    }

    if (component.types.includes("locality")) {
      address.city = component.long_name;
    }

    if (component.types.includes("administrative_area_level_1")) {
      address.state = component.long_name;
    }

    if (component.types.includes("country")) {
      address.country = component.long_name;
    }

    if (component.types.includes("postal_code")) {
      address.zip = component.long_name;
    }
  });

  console.log("extractAddress", { address });

  return address;
}

const CRYPTR = new Cryptr(env.NEXT_PUBLIC_ENCRYPTION_KEY, {
  pbkdf2Iterations: 1000,
  saltLength: 10,
});

export function encrypt(text: string) {
  return CRYPTR.encrypt(text);
}

export function decrypt(text: string) {
  return CRYPTR.decrypt(text);
}
