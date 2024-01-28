import { findAllPublicEvents } from "@/server/service/event.service";
import EventList from "@/components/shared/event-list";

export default async function Page() {

  const events = await findAllPublicEvents();

  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1>Explore</h1>
        <EventList events={events as any[]} />
      </div>
    </>
  )

}