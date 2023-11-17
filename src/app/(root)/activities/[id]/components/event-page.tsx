import prisma from '@/lib/prisma';
import ActivityPreview from '@/root/components/core/ActivityPreview';
import EventList from '@/root/components/core/EventList';
import { IActivity } from '@/types';
import { getServerSession } from 'next-auth';

const EventPage = async (props: { activity: IActivity }) => {
  const { activity } = props;
  const session = await getServerSession();

  let isPartOfAnyEvent: boolean = false;
  let participatedEvents: any = null;

  if (session) {
    const volunteeredEvents = await prisma.volunteers.findMany({
      where: {
        user_id: session?.user?.email || '',
      },
      include: {
        event: {
          include: {
            activity: true,
          },
        },
      },
    });

    console.log(JSON.stringify(volunteeredEvents, null, 2));

    isPartOfAnyEvent = volunteeredEvents.length > 0;
    participatedEvents = volunteeredEvents.at(0)?.event ?? null;
  }

  return (
    <div
      className="container h-auto px-0 mx-auto mb-10 w-100 bg-grey"
      key={activity.id}
    >
      <ActivityPreview activity={activity} />
      <EventList
        isPartOfAnyEvent={isPartOfAnyEvent}
        events={activity.events}
        size="lg"
        activity={activity}
        participatedEvents={participatedEvents}
      />

      {/* <PostsList imageUrls={imageUrls} /> */}
      {/* <UploadImageDropzone setImageUrls={setImageUrls} activity={activity} /> */}
    </div>
  );
};

export default EventPage;
