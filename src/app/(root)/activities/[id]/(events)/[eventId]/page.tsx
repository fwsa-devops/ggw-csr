import prisma from '@/lib/prisma';
import EventDetails from './components/event-detail';

const EventPage = async ({
  params,
}: {
  params: { activityId: string; eventId: string };
}) => {
  const { eventId } = params;

  const eventDetails = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activity: {
        include: {
          tags: true,
        },
      },
      feedback: {
        include: {
          assets: {
            include: {
              Asset: true,
            },
          },
          author: true,
        },
      },
    },
  });

  return (
    <>
      <EventDetails event={eventDetails} />

      {/* {JSON.stringify(eventDetails, null, 2)} */}
    </>
  );
};

export default EventPage;
