import { getActivity } from '@/components/events/utils';
import EventPage from '@/components/event';

export default async function Event({ params }: { params: { id: string } }) {
  let activity = await getActivity(params.id);

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

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
