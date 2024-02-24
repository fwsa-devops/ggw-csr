import { findAllPublicEvents } from '@/server/service/event.service';
import EventList from '@/components/shared/event-list';

export default async function Page() {
  const events = await findAllPublicEvents();

  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <h1 className="font-bold text-2xl">Explore</h1>

        <h2 className="font-medium text-xl mb-2"> Upcoming Events</h2>
        <EventList events={events as any[]} />
      </div>
    </>
  );
}
