import { MapPin } from "lucide-react";
import React from "react";
import { cn } from "../../../../lib/utils";

export default function EventLocation(props: {
  zipcode: string;
  state: string;
  city: string;
  address: string;

  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center gap-3 text-muted-foreground",
          props.className,
        )}
      >
        <div className="flex h-14 w-16 flex-col items-center justify-center overflow-hidden rounded-md border px-0 text-center shadow-sm">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>

        <div>
          <h3 className="mb-1 text-md font-semibold">
            {props.address} {props.zipcode}
          </h3>
          <p>
            {props.city}, {props.state}
          </p>
        </div>
      </div>
    </>
  );
}
