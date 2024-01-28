import EventItem from "@/components/shared/event-item";
import { Event } from "@prisma/client";
import { format } from "date-fns";

export default async function EventList({ events }: { events: Event[] }) {
  return (
    <div>
      <ul>
        {
          Object.entries(events
            .reduce((acc, event) => {
              const date = event.startDateTime.toDateString();
              const _events = acc[date] || [];
              return {
                ...acc,
                [date]: [..._events, event]
              }
            }, {}))
            .map(([date, events], index) => (
              <li
                key={index}
                className="my-4"
              >
                <h3 className="mb-3 text-xl font-semibold">
                  {format(new Date(date), 'do MMM')}</h3>
                <ul suppressHydrationWarning>
                  {
                    (events as any[]).map((event, index) => (
                      <li key={index}>
                        <EventItem event={event} />
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
        }
      </ul>
    </div>
  )
}