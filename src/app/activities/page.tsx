import ActiveEvents from '@/components/events/active-events';
import PastActivities from '@/components/events/past-events';
import {
  getAllActivitiesFromDB,
  getPastActivities,
} from '@/components/events/utils';

export default async function Home() {
  const activities = await getAllActivitiesFromDB();
  const pastActivities = await getPastActivities();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
          <PastActivities pastActivities={pastActivities} />
        </section>
      </main>
    </>
  );
}

export const revalidate = 30;
