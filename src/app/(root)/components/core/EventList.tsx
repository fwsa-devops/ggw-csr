import EventListItem from './EventIListItem';
import { IEvent } from '@/types';
import { getServerSession } from 'next-auth';

const EventList = async ({
  events,
  size = 'lg',
  isPartOfAnyEvent = false,
  activity,
}: {
  events: IEvent[];
  size: 'lg' | 'sm';
  isPartOfAnyEvent: boolean;
  activity: any;
}) => {
  const session = await getServerSession();

  const isPartOfThisEvent = (event: IEvent): boolean => {
    return (
      event.volunteers.find(
        (volunteer) => volunteer.user_id === session?.user?.email,
      ) !== undefined
    );
  };

  return (
    <>
      <div className="mt-12">
        <div className="flex flex-row justify-between">
          <h2 className="pb-2 pl-1 mb-2 text-2xl font-semibold text-gray-700">
            Events
          </h2>
        </div>
      </div>

      <div>
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventListItem
              activity={activity}
              key={event.id}
              event={event}
              size={size}
              isPartOfAnyEvent={isPartOfAnyEvent}
              isPartOfThisEvent={isPartOfThisEvent(event)}
            />
          ))
        ) : (
          <p>
            As of now, we have not scheduled any events. We appreciate your
            interest and will keep you updated as soon as we have something
            planned
          </p>
        )}
      </div>
    </>
  );
};

export default EventList;
