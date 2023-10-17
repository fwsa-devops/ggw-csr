import './event.css';
import 'tailwindcss/tailwind.css';
import {
  serializeActivities,
  getAllActivities,
  getPastActivities,
} from '../../components/events/utils';
import ActiveEvents from '@/components/events/active-events';
import PastActivities from '@/components/events/past-events';

type EventsComponentProps = {
  activities?: any[];
};

export const getServerSideProps = async (context) => {
  const activities = await getAllActivities();
  // console.log('activities', activities);
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
      <ActiveEvents activities={activities} />
      <PastActivities pastActivities={pastActivities} />
    </>
  );
};

export default EventsComponent;
