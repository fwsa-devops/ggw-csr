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
              "grid grid-cols-6 gap-3 text-muted-foreground md:grid-cols-10 lg:grid-cols-6",
            )}
          >
            <div className="col-span-1 flex h-14 w-16 flex-grow-0 flex-col items-center justify-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
              <MapPin className="text-white-400 h-8 w-8" />
            </div>

            <div className="group col-span-4 md:col-span-8 lg:col-span-5">
              <h3 className="mb-1 flex items-center text-[1rem] font-semibold">
                <span className="overflow-hidden line-clamp-1 truncate text-wrap">
                  {address.name ?? address.street}
                </span>
                <ArrowUpRight className="ml-1 min-h-4 min-w-4 cursor-pointer text-black group-hover:animate-shake dark:text-white" />
              </h3>
              <p className="text-sm">{`${address.city}, ${address.state}`}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
