"use client";

import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { type IEvent } from "@/server/model";
import LocalDateTime from "../layout/datetime";

type UserEventItemProps = {
  event: IEvent;
};

export default function UserEventItem(props: UserEventItemProps) {
  if (!props.event) return null;
  const { event } = props;

  return (
    <>
      <Link href={`/${event.slug}`}>
        <div className="mb-6 flex flex-row gap-6">
          <div className="flex w-fit flex-row">
            <Image
              src={event.image}
              alt={event.title}
              width={1000}
              height={1000}
              className="h-28 w-28 rounded-lg object-cover object-center"
            />
          </div>
          <div className="text-xs">
            <h3 className="mb-3 text-base font-medium">{event.title}</h3>
            <div className="mb-2 flex flex-row items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              <LocalDateTime
                value={event.startTime}
                format={"LLLL d, yyyy, hh:mm a"}
              />
            </div>
            <div className="mb-2 flex flex-row items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>
                {event.Address.street +
                  ", " +
                  event.Address.city +
                  ", " +
                  event.Address.state}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
