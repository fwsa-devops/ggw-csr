"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type EventAddressProps = {
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

export default function EventAddress(props: EventAddressProps) {
  const { address, location } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
    language: "en",
  });

  return (
    <>
      <div className={props.className}>
        <div>
          <h2 className="mb-1"> Location </h2>
          <Separator />
          <div className="prose-md prose mt-3 text-muted-foreground dark:prose-invert">
            <Link
              target="_blank"
              className="text-muted-foreground no-underline"
              href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
            >
              {`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`}
            </Link>
          </div>
        </div>

        {isLoaded && (
          <div className="mb-8">
            <GoogleMap
              zoom={15}
              center={{
                lat: location.latitude,
                lng: location.longitude,
              }}
              mapContainerClassName="map-container"
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              <Marker
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
              />
            </GoogleMap>
          </div>
        )}
      </div>
    </>
  );
}
