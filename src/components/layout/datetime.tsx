"use client";

import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import React from "react";

const convertDateTime = (date: string, format?: string) => {
  if (format) {
    return DateTime.fromISO(date).toFormat(format);
  }
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
};

type LocalDateTimeProps = {
  value: string;
  format?: string;
  className?: string;
};

export default function LocalDateTime(props: LocalDateTimeProps) {
  return (
    <time
      dateTime={props.value}
      className={ cn(props.className) }
    >
      {convertDateTime(props.value, props.format)}
    </time>
  );
}
