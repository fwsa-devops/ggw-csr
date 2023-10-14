import EventsComponent from '@/pages/events';
import {
  getAllActivities,
  getPastActivities,
  serializeActivities,
} from '@/components/events/utils';
import 'tailwindcss/tailwind.css';

export default async function Home() {
  let activities = await getAllActivities();
  activities = serializeActivities(activities);

  let pastActivities = await getPastActivities();
  pastActivities = serializeActivities(pastActivities);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen ">
      <section className="text-gray-600 body-font w-full overflow-hidden">
        <EventsComponent
          activities={activities}
          pastActivities={pastActivities}
        />
      </section>
    </main>
  );
}

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
