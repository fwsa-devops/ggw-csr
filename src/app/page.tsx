import EventsComponent from '@/pages/events';
import { getAllActivities, serializeActivities } from '@/pages/events/utils';
import 'tailwindcss/tailwind.css';

export default async function Home() {
  let activities = await getAllActivities();
  activities = serializeActivities(activities);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen ">
      <section className="text-gray-600 body-font w-full overflow-hidden">
        <EventsComponent activities={activities} />
      </section>
    </main>
  );
}

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
