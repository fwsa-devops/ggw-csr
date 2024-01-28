import EventList from "@/components/shared/event-list";
import { findAllUserRegistrations } from "@/server/service/registration.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    redirect('/home');
  }

  const registrations = await findAllUserRegistrations(session?.user?.email);


  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1>Calendar</h1>
        <EventList events={registrations as any[]} />
      </div>
    </>
  )

}