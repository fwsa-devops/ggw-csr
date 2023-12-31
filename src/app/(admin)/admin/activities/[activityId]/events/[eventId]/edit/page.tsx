import ActivityEventForm from '@/admin/activities/[activityId]/components/activity-event-form';
import prisma from '@/lib/prisma';

const EditEventpage = async ({ params }) => {
  const { activityId, eventId } = params;

  let event: any = null;

  if (eventId) {
    const _event = await prisma.event.findUnique({
      where: {
        id: eventId as string,
      },
      include: {
        leaders: {
          include: {
            user: true,
          },
        },
      },
    });
    event = _event;
    event.leaders = _event?.leaders.map((_l) => _l.user_id);
  }

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <div className="my-6 space-y-12">
            <div className="md:w-4/6 w-full mx-auto border-b border-gray-900/10 pb-12">
              <ActivityEventForm activityId={activityId} event={event} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EditEventpage;
