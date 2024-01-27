import { Button } from "@/components/ui/button";
import { findById } from "@/server/service/event.service";
import { UserValidator } from "@/server/validation/user.validator";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(props: { params: { eventId: string } }) {
  const { params } = props;
  const session = await getServerSession();
  let isOrganizer = false;

  if (!params.eventId) {
    redirect('/home');
  }

  const event = await findById(params.eventId);

  if (!event) {
    redirect('/home');
  }

  if (event.visibility === 'PRIVATE' && (!session || !session?.user?.email || session.user.email !== event.organizer.email)) {
    return (
      <>
        <h1>Event</h1>
        <h2>{event.name}</h2>
        <p>
          This event is private. You need to be invited to see it.
        </p>
        <p>
          <a href="/home">Go back</a>
        </p>
      </>
    )
  }

  if (session && session.user?.email) {
    const user = await UserValidator.checkUserExistsByEmail(session.user.email);
    if (user?.id === event.organizerId) {
      isOrganizer = true;
    }
  }


  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1>Event</h1>
        <h2>{event.name}</h2>

        <p>{format(event.startDateTime, 'PPP')}</p>
        <p>{format(event.endDateTime, 'PPP')}</p>

        {
          isOrganizer && (
            <p>
              You are hosting this event
              <Link className="mx-2" href={`/event/${event.id}/manage`}>Manage</Link>
            </p>
          )
        }

        {/* Registeration button */}
        <div>
          <h2>Registeration</h2>
          <p>
            <Button
            variant={'default'}
            >
            <Link href={`/event/${event.id}/register`}>Register</Link>
            </Button>
          </p>
        </div>

      </div>
    </>
  )

}