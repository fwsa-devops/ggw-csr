"use client";

import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import React from "react";
import useDateTimeStore from "../hooks/use-date-time-store";

// Function to convert date to the desired format and timezone
const convertDateTime = (date: Date, timezone: string, format?: string) => {
  const dt = DateTime.fromJSDate(date).setZone(timezone);

  if (format) {
    return dt.toFormat(format);
  }
  return dt.toLocaleString(DateTime.DATETIME_MED);
};

type LocalDateTimeProps = {
  value: Date;
  format?: string;
  className?: string;
};

export default function LocalDateTime(props: LocalDateTimeProps) {
  const { timezone } = useDateTimeStore(); // Get timezone from store
  const { value, format, className } = props;

  // Convert the date to the specified timezone
  const localDateTimeString = DateTime.fromJSDate(value)
    .setZone(timezone)
    .toJSDate();

  return (
    <time
      dateTime={localDateTimeString.toISOString()}
      className={cn(className)}
    >
      {convertDateTime(value, timezone, format)}
    </time>
  );
}
