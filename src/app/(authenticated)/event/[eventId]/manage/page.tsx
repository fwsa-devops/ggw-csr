
import { findById } from "@/server/service/event.service";
import { findAllRegistrations } from "@/server/service/registration.service";
import { EventValidator } from "@/server/validation/events.validator";
import { format } from "date-fns";
import Link from "next/link";

export default async function Page({ params }: { params: { eventId: string } }) {

  await EventValidator.checkUserIsEventOrganizer(params.eventId);

  const event = await findById(params.eventId);
  const registeredUsers = await findAllRegistrations(params.eventId);

  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1>Manage Event</h1>
        <p>
          <Link href="/home">
            Go back
          </Link>
        </p>
        <p>
          This is the manage event page.
        </p>
        <p>
          {event.name}
        </p>

        <p>
          {format(event.startDateTime, 'PPP')}
          {format(event.startDateTime, 'PPP')}
        </p>

        <div>
          <h3>Registrations</h3>
          <ul>
            {registeredUsers.map(_r =>
              <li key={_r.id}>
                <span className="mr-2">
                  {_r.user.name}
                </span>
                <span>
                  {_r.user.email}
                </span>
              </li>
            )}
          </ul>
        </div>


      </div>

    </>
  )
}