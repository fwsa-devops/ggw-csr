import prisma from '@/lib/prisma';
import EventDetails from './components/event-detail';

const EventPage = async ({
  params,
}: {
  params: { id: string; eventId: string };
}) => {
  const { eventId } = params;
  // console.log(eventId);

  const eventDetails = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activity: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
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

  console.log(eventDetails);

  return (
    <>
      <EventDetails event={eventDetails} />

      {/* {JSON.stringify(eventDetails, null, 2)} */}
    </>
  );
};

export default EventPage;
