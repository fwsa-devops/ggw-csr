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
import { format } from "date-fns";
import { type Address, type Location, type Event } from "@prisma/client";

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

export function createGoogleCalendarLink(
  event: Event & { Address: Address; Location: Location },
) {
  const extractContent = (s: string, space: boolean) => {
    return s.replace(/<[^>]*(>|$)| |‌|»|«|>/g, " ").replace(/ +/g, " ");
  };

  const startDate = format(new Date(event.startTime), "yyyyMMdd'T'HHmmss");
  const endDate = format(new Date(event.endTime), "yyyyMMdd'T'HHmmss");

  const description = `${extractContent(event.description, true)}
  
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
