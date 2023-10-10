import prisma from '@/lib/prisma';

export default async function Home() {
  const data = await getData();

  console.log('p', data?.props?.activites);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="flex flex-col items-center justify-center">
        <pre style={{ maxWidth: '100vw' }}>
          <code>{JSON.stringify(data?.props?.activites, null, 2)}</code>
        </pre>
      </div>
    </main>
  );
}

async function getData() {
  const activites = await prisma.activity.findMany({
    where: { published: true },
    include: {
      events: {
        include: {
          leaders: {},
          users: {},
        },
      },
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { activites },
    revalidate: 10,
  };
}

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
