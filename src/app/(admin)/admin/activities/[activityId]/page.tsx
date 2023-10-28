import EventPage from '@/admin/activities/[activityId]/components/event-page';
import { getActivity } from '@/components/utils';

export default async function Event({
  params,
}: {
  params: { activityId: string };
}) {
  const activity: any = await getActivity(params.activityId);

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <EventPage activity={activity} />
        </section>
      </main>
    </>
  );
}
