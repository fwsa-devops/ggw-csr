import './event.css';
import 'tailwindcss/tailwind.css';
import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';
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

  // const { data: session } = useSession();

  const session = {
    user: {
      email: 'mohammed.hasan@freshworks.com',
      name: 'Hasan',
      image: 'dummy',
    },
  };

  const isAlreadyJoined = () => {
    if (session?.user) {
      const user = prisma.user.findUnique({
        where: {
          email: session.user.email || '',
        },
      });
      // console.log('user', user, 'session', session);
      return !user;
    }
  };

  const joinEvent = () => {
    prisma.user.create({
      data: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
    });
    // need to add toaster
    isAlreadyJoined();
  };

  return (
    <>
      <ActiveEvents activities={activities} />
      <PastActivities pastActivities={pastActivities} />
    </>
  );
};

export default EventsComponent;
