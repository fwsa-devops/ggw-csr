/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextImage from "next/image";
import React from "react";

import EventDate from "./components/event-date";
import EventLocation from "./components/event-location";
import { Separator } from "@/components/ui/separator";
import * as EventService from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import EventAddress from "./components/event-address";
import EventRegister from "./components/event-register";

import { findMany } from "@/server/service/participant.service";
import { type User } from "@prisma/client";
import UserAvatar from "@/components/ui/user-avatar";
import { createGoogleCalendarLink } from "@/lib/utils";
import { DateTime } from "luxon";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CalendarCheck } from "lucide-react";
import { getAllEventSlugs } from "@/server/service/explore.service";
import EventParticipants from "./components/event-participants";
import { type Metadata, type ResolvingMetadata } from "next";

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await EventService.findBySlug(params.slug);

  if (!response || response.status !== StatusCodes.OK) {
    return null;
  }
  const { data: event } = response;
  if (!event) {
    return null;
  }

  const { data: _participants } = await findMany(event.id);
  let participants: { User: User }[] = [];
  if (
    _participants &&
    _participants.length > 0 &&
    typeof _participants !== "string"
  ) {
    participants = _participants.filter((item) => typeof item !== "string") as {
      User: User;
    }[];
  }

  const url = createGoogleCalendarLink(event as any);

  return (
    <>
      <div className="ga-8 mx-auto grid w-full max-w-6xl lg:grid-cols-7 lg:gap-14">
        <div className="col-span-4">
          <div className="aspect-h-1 aspect-w-1 col-span-4 mb-6 w-full overflow-hidden rounded-lg bg-gray-200 md:aspect-h-2 md:aspect-w-3 xl:aspect-h-3 xl:aspect-w-4">
            <NextImage
              src={event.image}
              alt={event.title ? `Image for ${event.title}` : "Image for event"}
              width={"634"}
              height={"634"}
              priority={true}
              // sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 100px"
              className="object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="hidden lg:block">
            <div className="mb-6">
              <h2 className="mb-1"> Hosted by </h2>
              <Separator />
              <div className="mt-4 flex flex-row items-center text-muted-foreground">
                <UserAvatar user={event.User} className="mr-2 h-8 w-8" />
                <p className="font-medium text-black dark:text-white">
                  {event.User.name}
                </p>
              </div>
            </div>
            <EventParticipants participants={participants} eventId={event.id} />
          </div>
        </div>

        <div className="col-span-3">
          <h1 className="mb-8 mt-4 text-[2.5rem] font-extrabold leading-tight md:text-[2.75rem] lg:leading-snug">
            {event.title}
          </h1>

          <div className="mb-10">
            <EventDate
              startTime={event.startTime}
              endTime={event.endTime}
              calender={url}
            />
            <EventLocation
              className="my-4"
              location={event.Location}
              address={event.Address}
            />

            {DateTime.fromJSDate(event.startTime).toMillis() >=
              DateTime.now().toMillis() && <EventRegister eventId={event.id} />}

            {DateTime.fromJSDate(event.startTime).toMillis() <
              DateTime.now().toMillis() && (
              // Event has already ended
              <>
                <div className="mt-6">
                  {/* <h2 className="mb-1"> Event </h2>
                  <Separator /> */}

                  <Alert className="mt-6 text-muted-foreground">
                    <CalendarCheck className="h-4 w-4" />
                    <AlertTitle className="text-sm font-normal">
                      This event has already ended.
                    </AlertTitle>
                  </Alert>
                </div>
              </>
            )}

            <div className="mt-6 block lg:hidden">
              <div className="mb-6">
                <h2 className="mb-1 "> Hosted by </h2>
                <Separator />
                <div className="mt-4 flex flex-row items-center text-muted-foreground">
                  <UserAvatar user={event.User} className="mr-2 h-8 w-8" />
                  <p className="font-medium text-black dark:text-white">
                    {event.User.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-1"> About </h2>
            <Separator />
            <div
              className="prose-md prose mt-3 text-muted-foreground dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>
          </div>

          <EventAddress
            className="my-8"
            location={event.Location}
            address={event.Address}
          />

          <div className="block lg:hidden">
            <EventParticipants participants={participants} eventId={event.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const response = await getAllEventSlugs();
  if (!response || response.status !== StatusCodes.OK) {
    return [];
  }
  const { data: slugs } = response;
  if (!slugs) {
    return [];
  }
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return paths;
}

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.slug;
  const response = await EventService.findBySlug(id);

  if (!response || response.status !== StatusCodes.OK) {
    return {};
  }
  const { data: event } = response;

  if (!event) {
    return {};
  }

  const meta: Metadata = {
    title: event.title,
    description: event.description,
    openGraph: {
      url: `https://globalgiving.freshworks.com/${event.slug}`,
      siteName: "Freshworks Project Giving",
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.image,
          width: 600,
          height: 600,
          alt: `Image for ${event.title}`,
        },
      ],
    },
  };

  return meta;
}


export const revalidate = 60 * 30;