"use client";

import LocalDateTime from "@/components/layout/datetime";
import { Button } from "@/components/ui/button";
import { type IEvent } from "@/server/model";
import { Calendar, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";

type Props = {
  event: IEvent;
};

export default function EventCard(props: Props) {
  const {event} = props;

  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-4 xl:aspect-w-4">
        <Image
          width={"500"}
          height={"500"}
          src={event.image}
          alt={`Image of ` + event.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="text-md mb-3 mt-4 font-medium text-gray-700 dark:text-gray-100">
        {event.title}
      </h3>

      <p className="mb-2 flex text-sm text-gray-900 dark:text-gray-300">
        <Calendar className="mr-2 h-5 w-5 text-gray-400" />
        <LocalDateTime value={event.startTime} />
      </p>

      <p className="flex text-sm text-gray-900 dark:text-gray-300 ">
        <MapPin className="mr-2 h-5 w-5 text-gray-400" />
        {event.Address.city}, {event.Address.state}
      </p>

      <div className="mt-3">
        <Button size={"sm"} variant={"secondary"} className="w-full">
          know more
          <MoveRight className="ml-2 h-5 w-5 text-gray-400" />
        </Button>
      </div>
    </>
  );
}
