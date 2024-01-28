import { findById } from "@/server/service/event.service";
import { RegistrationValidator } from "@/server/validation/registration.validator";
import { UserValidator } from "@/server/validation/user.validator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EventDetails from "./components/event-details";

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


  const isRegistered = await RegistrationValidator.checkRegistrationExists(event.id, session?.user?.email as string);


  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <EventDetails event={event} isOrganizer={isOrganizer} isRegistered={isRegistered} />
      </div>
    </>
  )

}