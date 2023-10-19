import ActiveEvents from '@/components/events/active-events';
import {
  getAllActivitiesFromDB,
  getPastActivities,
  serializeActivities,
} from '@/components/events/utils';

export default async function Home() {
  let activities = await getAllActivitiesFromDB();
  // activities = serializeActivities(activities);

  // let pastActivities = await getPastActivities();
  // pastActivities = serializeActivities(pastActivities);

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
        </section>
      </main>
    </>
  );
}
