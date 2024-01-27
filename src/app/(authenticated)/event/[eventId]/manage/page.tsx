
import { findById } from "@/server/service/event.service";
import { format } from "date-fns";
import Link from "next/link";

export default async function Page({ params }: { params: { eventId: string } }) {

  const event = await findById(params.eventId);

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

      </div>

    </>
  )
}