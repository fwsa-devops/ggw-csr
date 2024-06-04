/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { type Address, type Location, type User, type Event } from "@prisma/client";
import { NextSeo } from "next-seo";

export default function EventSEO(props: {
  event: Event & { User: User; Location: Location; Address: Address };
}) {
  const event = props.event;

  return (
    <NextSeo
      title={event?.title}
      description={event.description}
      openGraph={{
        url: `https://www.example.com/${event.slug}`,
        siteName: "Freshworks Project Giving",
        title: event.title,
        description: event.description,
        images: [
          {
            url: event.image,
            width: 800,
            height: 600,
            alt: event.title,
          },
        ],
      }}
    />
  );
}
