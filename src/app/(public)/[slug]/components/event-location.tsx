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
    name?: string | null;
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
              "flex flex-row items-center gap-3 text-muted-foreground group",
            )}
          >
            <div className="flex h-16 min-w-[64px] flex-col items-center justify-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
              <MapPin className="text-white-400 h-7 w-7" />
            </div>

            <div className="group">
              <h3 className="mb-1 flex items-center text-[1rem] font-semibold">
                <span className="text-wrap truncate line-clamp-1 overflow-auto">
                {address.street}
                </span>
                <ArrowUpRight className="ml-2 min-h-[16px] min-w-[16px] cursor-pointer text-black group-hover:animate-shake dark:text-white" />
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
