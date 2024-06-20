import UserEventItem from "@/components/shared/user-event-item";
import { type IEvent } from "@/server/model";
import { userRegisteredEvent } from "@/server/service/profile.service";
import { SessionValidator } from "@/server/validators/session.validator";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default async function EventsRegistered() {
  const session = await SessionValidator.validateSession();

  if (!session) {
    await signIn("google", { callbackUrl: "/profile" });
    return null;
  }

  const { data: events } = await userRegisteredEvent(session.id);

  const upcomingEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.endTime).setZone(event.timezone) >
      DateTime.now(),
  ).sort((a, b) => DateTime.fromJSDate(a.startTime).toMillis() - DateTime.fromJSDate(b.startTime).toMillis());

  const pastEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.endTime).setZone(event.timezone) <
      DateTime.now(),
  ).sort((a, b) => DateTime.fromJSDate(b.startTime).toMillis() - DateTime.fromJSDate(a.startTime).toMillis());

  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-2xl lg:grid lg:gap-10">
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="flex flex-col gap-4">
            {upcomingEvents?.map((event) => (
              <EventItem
                key={event.id}
                event={event as unknown as IEvent}
              />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Past Events</h2>
          <div className="flex flex-col gap-4">
            {pastEvents?.map((event) => (
              <EventItem
                key={event.id}
                event={event as unknown as IEvent}
              />
            ))}

            {!pastEvents?.length && (
              <div className="flex flex-row items-center gap-4 text-muted-foreground">
                <span>No past events</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const EventItem = ({ event }: { event: IEvent }) => {
  return (
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
          <h3 className="mb-3 text-base font-medium">{event.title}</h3>
          {/* <p className="mb-2 flex flex-row items-center">
              <UserAvatar user={event.User} className="mr-2 h-5 w-5" />
              <span>{event.User.name}</span>
            </p> */}
          <div className="mb-2 flex flex-row items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            {DateTime.fromJSDate(event.startTime).toFormat(
              "LLLL d, yyyy, hh:mm a",
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
  );
};
