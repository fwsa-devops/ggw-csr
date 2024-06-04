/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Separator } from "@/components/ui/separator";
import { SessionValidator } from "@/server/validators/session.validator";
import { AtSign, CalendarDays, MapPin, MicVocal, Ticket } from "lucide-react";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";
import Image from "next/image";
import UserAvatar from "@/components/ui/user-avatar";
import Link from "next/link";
import {
  userCreatedEvent,
  userRegisteredEvent,
} from "@/server/service/profile.service";
import UserEventItem from "@/components/shared/user-event-item";

export default async function Page() {
  const session = await SessionValidator.validateSession();

  if (!session) {
    await signIn("google", { callbackUrl: "/profile" });
    return null;
  }

  const { data: events } = await userCreatedEvent(session.id);
  const { data: registeredEvents } = await userRegisteredEvent(session.id);

  const upcomingEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.startTime).setZone(event.timezone) >
      DateTime.now(),
  );

  const pastEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.startTime).setZone(event.timezone) <
      DateTime.now(),
  );

  return (
    <>
      <div className="ga-8 mx-auto w-full max-w-2xl lg:gap-14">
        <div className="mb-10 flex w-full flex-row justify-center gap-10">
          <Image
            src={session.image ?? ""}
            alt="Profile Picture"
            width={1000}
            height={1000}
            className="h-28 w-28 rounded-full"
          />

          <div className="">
            <h1 className="mb-2 text-lg">{session.name}</h1>
            <p className="my-2 flex flex-row items-center text-sm">
              <AtSign className="mr-2 h-4 w-4" />
              {session.email}
            </p>

            <p className="my-2 flex flex-row items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Joined{" "}
              {DateTime.fromJSDate(session.createdAt).toFormat("LLLL yyyy")}
            </p>
            <p className="my-2 flex flex-row items-center text-sm">
              <MicVocal className="mr-2 h-4 w-4" />
              Hosted{" "}
              <span className="mx-2 font-semibold">
                {" "}
                {events?.length}{" "}
              </span>{" "}
              events
            </p>
            <p className="my-2 flex flex-row items-center text-sm">
              <Ticket className="mr-2 h-4 w-4" />
              Attended{" "}
              <span className="mx-2 font-semibold">
                {" "}
                {registeredEvents?.length}{" "}
              </span>{" "}
              events
            </p>
          </div>
        </div>

        <Separator className="w-full" />

        <div className="mx-auto mt-10 max-w-[440px]">
          <h2 className="text=lg mb-6 font-medium">Hosting</h2>

          {upcomingEvents?.map((event) => (
            <>
              <Link href={`/${event.slug}`}>
                <div className="mb-6 flex flex-row gap-6">
                  <div className="flex w-fit flex-row">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={1000}
                      height={1000}
                      className="h-28 w-28 rounded-lg object-cover object-center"
                    />
                  </div>
                  <div className="text-xs">
                    <h3 className="mb-3 text-base font-medium">
                      {event.title}
                    </h3>
                    <p className="mb-2 flex flex-row items-center">
                      <UserAvatar user={event.User} className="mr-2 h-5 w-5" />
                      <span>{event.User.name}</span>
                    </p>
                    <div className="mb-2 flex flex-row items-center">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {DateTime.fromJSDate(event.startTime).toFormat(
                        "LLLL d, yyyy, hh:mm a ZZZZ",
                      )}
                    </div>
                    <div className="mb-2 flex flex-row items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>
                        {event.Address.street +
                          ", " +
                          event.Address.city +
                          ", " +
                          event.Address.state}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}

          {upcomingEvents?.length === 0 && (
            <p className="text-sm font-light">No upcoming events</p>
          )}
        </div>

        <div className="mx-auto mt-10 max-w-[440px]">
          <h2 className="text=lg mb-6 font-medium">Past Events</h2>

          {pastEvents?.map((event) => (
            <>
              <UserEventItem event={event as any} />
            </>
          ))}

          {pastEvents?.length === 0 && (
            <p className="text-sm font-light">No past events</p>
          )}
        </div>
      </div>
    </>
  );
}
