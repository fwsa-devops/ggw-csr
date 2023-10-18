import ActiveEvents from '@/components/events/active-events';
import {
  getAllActivities,
  getFilteredActivitiesBasedOnTime,
  getPastActivities,
  serializeActivities,
} from '@/components/events/utils';

export default async function Home() {
  let activities = await getAllActivities();
  activities = serializeActivities(activities);

  // let pastActivities = await getPastActivities();
  // pastActivities = serializeActivities(pastActivities);
  console.log('activities state', activities);

  const onDateChange = async (value) => {
    console.log('value', value);
    return getFilteredActivitiesBasedOnTime(value);
  };
  console.log(
    'filtered events',
    await onDateChange({
      from: '2023-10-13T16:51:54.704Z',
      to: '2023-10-15T18:30:00.000Z',
    }),
  );
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
