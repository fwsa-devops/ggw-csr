"use client";

import React from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function EventDate(props: {
  startTime: Date;
  endTime: Date;
  calender: string;
}) {
  const MONTH = DateTime.fromJSDate(props.startTime).toFormat("LLL");
  const DAY = DateTime.fromJSDate(props.startTime).toFormat("dd");

  const DATE = DateTime.fromJSDate(props.startTime).toFormat("EEEE, LLLL d");
  const START_TIME = DateTime.fromJSDate(props.startTime).toFormat("h:mm a");
  const END_TIME = DateTime.fromJSDate(props.endTime).toFormat("h:mm a ZZZZ");

  return (
    <>
      <Link href={`${props.calender}`} target="_blank">
        <div className="grid grid-cols-6 gap-3  text-muted-foreground md:grid-cols-10 lg:grid-cols-6">
          <div className="col-span-1 flex w-16 flex-col items-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
            <small className="w-full bg-gray-300 text-sm font-medium dark:bg-gray-800">
              {MONTH}
            </small>
            <p className="text-md m-0 py-1"> {DAY} </p>
          </div>

          <div className="group col-span-5 md:col-span-8  lg:col-span-5">
            <h3 className="mb-1 flex items-center text-[1rem] font-semibold">
              {DATE}
              <ArrowUpRight className="ml-2 h-4 w-4 cursor-pointer text-black group-hover:animate-shake dark:text-white" />
            </h3>
            <p className="text-sm">
              <time dateTime={props.startTime.toISOString()}>{START_TIME}</time>{" "}
              - <time dateTime={props.endTime.toISOString()}>{END_TIME}</time>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
