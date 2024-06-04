"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import React from "react";
import { cn } from "../../../../lib/utils";
import Link from "next/link";

type EventLocationProps = {
  location: {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  address: {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
  className?: string;
};

export default function EventLocation(props: EventLocationProps) {
  const { address, location } = props;

  return (
    <>
      <div className={props.className}>
        <Link
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
        >
          <div
            className={cn(
              "flex flex-row items-center gap-3 text-muted-foreground",
            )}
          >
            <div className="flex h-14 w-16 flex-col items-center justify-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
              <MapPin className="h-8 w-8 text-white-400" />
            </div>

            <div className="group">
              <h3 className="text-[1rem] mb-1 flex items-center font-semibold">
                {address.street}
                <ArrowUpRight className="group-hover:animate-shake ml-2 h-4 w-4 cursor-pointer text-black dark:text-white" />
              </h3>
              <p className="text-sm">
                {address.city}, {address.state}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
