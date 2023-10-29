import ActiveEvents from '@/root/components/active-events';
import PastActivities from '@/root/components/past-events';
import {
  getAllActivitiesFromDB,
  getPastActivities,
} from '@/components/utils';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const activities = await getAllActivitiesFromDB();
  const pastActivities = await getPastActivities();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
          <Separator className="mt-6 mb-4" />
          <PastActivities pastActivities={pastActivities} />
        </section>
      </main>
    </>
  );
}

export const revalidate = 10;
