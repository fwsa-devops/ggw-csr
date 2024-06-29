"use client";

import React from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LocalDateTime from "@/components/layout/datetime";

export default function EventDate(props: {
  startTime: Date;
  endTime: Date;
  timezone: string;
  calender: string;
}) {
  const startDateTime = DateTime.fromJSDate(props.startTime).setZone(props.timezone);
  const endDateTime = DateTime.fromJSDate(props.endTime).setZone(props.timezone);

  const MONTH = startDateTime.toFormat("LLL");
  const DAY = startDateTime.toFormat("dd");

  const isSameDayEvent = () => {
    return startDateTime.hasSame(endDateTime, 'day');
  };

  const isSameMonthEvent = () => {
    return startDateTime.hasSame(endDateTime, 'month');
  };

  return (
    <>
      <Link href={`${props.calender}`} target="_blank">
        <div className="group flex flex-row items-center gap-3 text-muted-foreground">
          <div className="flex min-w-[64px] flex-col items-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
            <small className="w-full text-sm bg-gray-300 dark:bg-gray-800">
              {MONTH}
            </small>
            <p className="text-md m-0 py-1"> {DAY} </p>
          </div>

          <div className="">
            <h3 className="mb-1 flex items-center text-[1rem] text-gray-600 dark:text-gray-200 font-semibold">
              {isSameDayEvent() ? (
                <LocalDateTime value={props.startTime} format="EEEE, LLLL d" />
              ) : (
                <>
                  <LocalDateTime value={props.startTime} format="LLLL d (EEE) " />
                  {( !isSameDayEvent() || isSameMonthEvent())  && <span className="mx-2">
                    -
                  </span>}
                  <LocalDateTime value={props.endTime} format={isSameMonthEvent() ? " d (EEE)" : "LLLL d (EEE)"} />
                </>
              )}
              <ArrowUpRight className="ml-2 min-h-[16px] min-w-[16px] cursor-pointer text-black group-hover:animate-shake dark:text-white" />
            </h3>
            <p className="text-sm">
              <LocalDateTime value={props.startTime} format="h:mm a " />
              {' - '}
              <LocalDateTime value={props.endTime} format="h:mm a ZZZZ" />
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}