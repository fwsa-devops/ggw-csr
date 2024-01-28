import EventList from "@/components/shared/event-list";
import { findAll } from "@/server/service/event.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }

  const events = await findAll();

  return (
    <div className="flex-1 space-y-8 pt-6 md:p-8">
      <h1>Events</h1>
      <div>
      <EventList  events={events}  />
      </div>
    </div>
  );
}