import EventsComponent from '@/components/events';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import prisma from '@/lib/prisma';

export default async function Home() {
  const data = await getData();

  // console.log('data', data?.props?.activities);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen ">
      <section className="text-gray-600 body-font w-full overflow-hidden">
        <EventsComponent activities={data.props.activities} />
      </section>
    </main>
  );
}

async function getData() {
  const activities = await prisma.activity.findMany({
    where: { published: true },
    include: {
      events: {
        include: {
          leaders: {
            include: {
              user: {},
            },
          },
          users: {},
        },
      },
      author: {
        select: { name: true },
      },
    },
  });

  const users = await prisma.user.findMany();
  console.log('users', users);

  return {
    props: { activities },
    revalidate: 10,
  };
}

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
