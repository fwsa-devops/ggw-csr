import prisma from '@/lib/prisma';
import EventDetails from './components/event-detail';

async function getEventDetails(eventId: string) {
  return await prisma.event.findUnique({
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
}

const EventPage = async ({
  params,
}: {
  params: { id: string; eventId: string };
}) => {
  const eventDetails = await getEventDetails(params.eventId);

  return (
    <>
      <div className="responsive-wrapper">
        <EventDetails event={eventDetails} />
      </div>
    </>
  );
};

export default EventPage;
