import ActiveEvents from '@/components/events/active-events';
import {
  getAllActivities,
  getPastActivities,
  serializeActivities,
} from '@/components/events/utils';

export default async function Home() {
  let activities = await getAllActivities();
  activities = serializeActivities(activities);

  // let pastActivities = await getPastActivities();
  // pastActivities = serializeActivities(pastActivities);

  return (
    <>
      <div className="mt-8 main-header ">
        <h1 className="text-xl">Upcoming Events</h1>
      </div>

      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
        </section>
      </main>
    </>
  );
}
