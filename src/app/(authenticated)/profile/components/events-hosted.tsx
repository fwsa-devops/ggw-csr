import UserEventItem from "@/components/shared/user-event-item";
import { type IEvent } from "@/server/model";
import { userCreatedEvent } from "@/server/service/profile.service";
import { SessionValidator } from "@/server/validators/session.validator";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";

export default async function EventsHosted() {
  const session = await SessionValidator.validateSession();

  if (!session) {
    await signIn("google", { callbackUrl: "/profile" });
    return null;
  }

  const { data: events } = await userCreatedEvent(session.id);

  const upcomingEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.endTime).setZone(event.timezone) >
      DateTime.now(),
  );

  const pastEvents = events?.filter(
    (event) =>
      DateTime.fromJSDate(event.endTime).setZone(event.timezone) <
      DateTime.now(),
  );

  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-2xl lg:grid lg:gap-10">
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="flex flex-col gap-4">
            {upcomingEvents?.map((event) => (
              <UserEventItem
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
              <UserEventItem
                key={event.id}
                event={event as unknown as IEvent}
              />
            ))}

            {
              !pastEvents?.length && (
                <div className="flex flex-row items-center gap-4 text-muted-foreground">
                  <span>No past events</span>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
}
