import prisma from '@/lib/prisma';
import ActiveEvents from './components/active-events';

const Page = async () => {
  const activities: any = await prisma.activity.findMany({
    include: {
      events: {
        take: 2,
        include: {
          leaders: {
            include: {
              user: true,
            },
          },
          volunteers: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
        </section>
      </main>
    </>
  );
};

export default Page;
