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


import { findMany } from "@/server/service/participant.service";
import { type User } from "@prisma/client";
import UserAvatar from "@/components/ui/user-avatar";
import { createGoogleCalendarLink } from "@/lib/utils";

import { getAllEventSlugs } from "@/server/service/explore.service";
import EventParticipants from "./components/event-participants";
import { type Metadata, type ResolvingMetadata } from "next";
import Link from "next/link";
import { stripHtml } from "string-strip-html";

import EventManageLink from "./components/event-manage-link";
import EventParticipants2 from "./components/event-participants-2";
import { EventStateManager } from "./components/event-state";

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

  const url = createGoogleCalendarLink(event);

  return (
    <>
      <div className="ga-8 mx-auto grid w-full max-w-5xl lg:grid-cols-5 lg:gap-14">
        <div className="col-span-1 lg:col-span-2">
          <div className="col-span-4 mb-6 max-h-[700px] w-full overflow-hidden rounded-lg">
            <NextImage
              src={event.image}
              alt={event.title ? `Image for ${event.title}` : "Image for event"}
              width={"720"}
              height={"720"}
              priority={true}
              // sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 100px"
              className="object-contain object-center group-hover:opacity-75"
            />
          </div>
          <div className="hidden lg:block">
            <div className="mb-6">
              <h2 className="mb-1"> Hosted by </h2>
              <Separator />
              <div className="">
                {event.User.map((_user: User) => (
                  <>
                    <div className="mt-4 flex w-full flex-row justify-between text-muted-foreground">
                      <Link
                        href={`/user/${_user.id}`}
                        className="flex w-fit flex-row items-center text-muted-foreground"
                      >
                        <UserAvatar user={_user} className="mr-2 h-8 w-8" />
                        <p className="font-medium text-black dark:text-white">
                          {_user.name}
                        </p>
                      </Link>

                      <EventManageLink event={event} user={_user} />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <EventParticipants2
              participants={participants}
              eventId={event.id}
            />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <div className="mb-8">
            <h1 className="mt-4 text-[2.5rem] font-extrabold leading-tight md:text-[2.75rem] lg:leading-snug">
              {event.title}
            </h1>
          </div>

          <div className="mb-10">
            <EventDate
              startTime={event.startTime}
              endTime={event.endTime}
              timezone={event.timezone}
              calender={url}
            />
            <EventLocation
              className="my-4"
              location={event.Location}
              address={event.Address}
            />

            <EventStateManager id={event.slug} />

            <div className="mt-6 block lg:hidden">
              <div className="mb-6">
                <h2 className="mb-1 "> Hosted by </h2>
                <Separator />
                <div className="">
                  {event.User.map((_user: User) => (
                    <>
                      <div className="mt-4 flex w-full flex-row justify-between text-muted-foreground">
                        <Link
                          href={`/user/${_user.id}`}
                          className="flex w-fit flex-row items-center text-muted-foreground"
                        >
                          <UserAvatar user={_user} className="mr-2 h-8 w-8" />
                          <p className="font-medium text-black dark:text-white">
                            {_user.name}
                          </p>
                        </Link>

                        <EventManageLink event={event} user={_user} />
                      </div>
                    </>
                  ))}
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

  const _description = stripHtml(event.description).result.substring(0, 200);

  const meta: Metadata = {
    title: event.title,
    description: event.description,
    openGraph: {
      url: `https://globalgiving.freshworks.com/${event.slug}`,
      siteName: "Freshworks Project Giving",
      title: event.title,
      description: _description,
      images: {
        url: event.image,
        width: 600,
        height: 600,
        alt: `Image for ${event.title}`,
      },
    },
    twitter: {
      images: {
        url: event.image,
        width: 600,
        height: 600,
        alt: `Image for ${event.title}`,
      },
      title: event.title,
      description: _description,
      site: "globalgiving.freshworks.com",
      card: "summary_large_image",
    },
  };

  return meta;
}

// 10 minutes
export const revalidate = 60 * 10;
