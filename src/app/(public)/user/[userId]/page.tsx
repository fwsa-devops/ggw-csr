/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, MicVocal, Ticket } from "lucide-react";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";
import { db } from "@/server/db";
import {
  userCreatedEvent,
  userRegisteredEvent,
} from "@/server/service/profile.service";
import UserEventItem from "@/components/shared/user-event-item";
import UserAvatar from "@/components/ui/user-avatar";

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await db.user.findUnique({
    where: { id: params.userId },
  });

  if (!session ?? !session?.id) {
    await signIn("google", { callbackUrl: "/profile" });
    return null;
  }

  const { data: events } = await userCreatedEvent(session?.id);
  const { data: registeredEvents } = await userRegisteredEvent(session?.id);

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

  if (session.image) {
    session.image = session.image?.replace("s96-c", "s600-c");
  }

  return (
    <>
      <div className="ga-8 mx-auto w-full max-w-2xl lg:gap-14">
        <div className="mb-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
          <UserAvatar user={session} className="h-32 w-32 rounded-full" />
          <div className="">
            <h1 className="mb-2 text-lg">{session.name}</h1>
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

        <Separator className="my-10 w-full" />

        <div className="mx-auto mt-10 max-w-[440px]">
          <h2 className="text=lg mb-6 font-medium">Upcoming Events</h2>

          {upcomingEvents?.map((event) => (
            <>
              <UserEventItem event={event as any} />
            </>
          ))}

          {upcomingEvents?.length === 0 && (
            <p className="text-sm font-light">No upcoming events</p>
          )}
        </div>

        <Separator className="mx-auto my-10 w-3/5" />

        <div className="mx-auto max-w-[440px]">
          <h2 className="text=lg mb-6 font-medium">Past events</h2>

          {pastEvents?.map((event) => (
            <>
              <UserEventItem event={event as any} />
            </>
          ))}

          {pastEvents?.length === 0 && (
            <p className="text-sm font-light">No Past events</p>
          )}
        </div>
      </div>
    </>
  );
}

export const revalidate = 60 * 30;
