import './event.css';
import 'tailwindcss/tailwind.css';
import {
  serializeActivities,
  getAllActivitiesFromDB,
  getPastActivities,
} from '../../components/events/utils';
import ActiveEvents from '@/components/events/active-events';
import PastActivities from '@/components/events/past-events';

type EventsComponentProps = {
  activities?: any[];
};

export const getServerSideProps = async (context) => {
  const activities = await getAllActivitiesFromDB();
  // console.log('activities server side', activities);
  const serializedActivities = serializeActivities(activities);

  let pastActivities = await getPastActivities();
  pastActivities = serializeActivities(pastActivities);

  return {
    props: {
      activities: serializedActivities,
      pastActivities: pastActivities,
    },
  };
};

const EventsComponent = (props: any) => {
  let { activities, pastActivities } = props;

  return (
    <>
      {/* <ActiveEvents activities={activities} /> */}
      {/* <PastActivities pastActivities={pastActivities} /> */}
    </>
  );
};

export default EventsComponent;
