"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import EventImageDialog from "./overview/event-image-dialog";
import { type IEvent } from "@/server/model";
import { Separator } from "@/components/ui/separator";
import EventAddHost from "./overview/event-add-host";
import Link from "next/link";
import UserAvatar from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import { EventEditSheet } from "./overview/event-edit-sheet";
import { cn, createGoogleCalendarLink } from "@/lib/utils";
import { MapPin } from "lucide-react";
import EventUpdateLocation from "./overview/event-update-location";
import { useLoadScript } from "@react-google-maps/api";
import EventDate from "@/app/(public)/[slug]/components/event-date";
import EventLocation from "@/app/(public)/[slug]/components/event-location";

type Props = {
  event: IEvent;
};

export default function ManageOverview(props: Props) {
  const { event } = props;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
    language: "en",
  });

  const url = createGoogleCalendarLink(event);

  return (
    <>
      <div className="mt-4 p-2">
        <div>
          <Card className="">
            <CardContent className="p-3">
              <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-6">
                <div className="col-span-1">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-transparent xl:aspect-h-4 xl:aspect-w-4">
                    <Image
                      src={props.event.image}
                      alt={props.event.title}
                      width={"720"}
                      height={"720"}
                      priority={true}
                      className="rounded-md object-cover object-center shadow-md md:max-h-[400px] md:min-h-[300px] md:w-full"
                    />

                    <span className="group h-full w-full">
                      <span className="flex h-full  w-full items-center justify-center opacity-0 group-hover:cursor-pointer group-hover:bg-inherit group-hover:opacity-100">
                        <EventImageDialog event={props.event}>
                          <Button type="button" variant={"secondary"}>
                            Change Image
                          </Button>
                        </EventImageDialog>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col-span-1 flex-col justify-between md:flex">
                  <h3 className="mb-3 text-2xl font-semibold">When & Where</h3>

                  <div className="mb-auto">
                    <div className="my-3">
                      <EventDate
                        startTime={event.startTime}
                        endTime={event.endTime}
                        timezone={event.timezone}
                        calender={url}
                      />
                    </div>

                    <div className="my-3">
                      <EventLocation
                        className="my-4"
                        location={event.Location}
                        address={event.Address}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <EventEditSheet event={props.event}>
                      <Button variant={"default"} size={"sm"} className="">
                        Edit Event
                      </Button>
                    </EventEditSheet>
                    {isLoaded && (
                      <EventUpdateLocation event={props.event}>
                        <Button
                          variant={"default"}
                          size={"sm"}
                          className="w-full"
                        >
                          Update Location
                        </Button>
                      </EventUpdateLocation>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>{" "}
          </Card>
        </div>

        <Separator className="my-4" />

        <section>
          <div className="mb-2 flex-row items-end justify-between md:flex">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg"> Host </h2>
              <p className="text-sm text-muted-foreground">
                Add hosts, special guests and speakers to your event.
              </p>
            </div>
            <div>
              <EventAddHost eventSlug={props.event.slug} />
            </div>
          </div>
          <div>
            {props.event.User.map((host) => (
              <>
                <div className="mt-4 flex w-full flex-row justify-between text-muted-foreground">
                  <Link
                    href={`/user/${host.id}`}
                    className="flex w-fit flex-row items-center text-muted-foreground"
                  >
                    <UserAvatar user={host} className="mr-2 h-8 w-8" />
                    <p className="font-medium text-black dark:text-white">
                      {host.name}
                    </p>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
