import { getActivity } from '@/components/utils';
import EventPage from './components/event-page';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch data or use params to generate dynamic metadata
  const activity = await getActivity(params.id);

  const title = `Event - ${activity?.name}`;

  return {
    title,
    description: activity?.summary,
    authors: [{ name: activity?.author?.name }],
    openGraph: {
      type: 'article',
      url: `${process.env.NEXTAUTH_URL}activities/${params.id}`,
      title: title,
      description: activity?.summary,
      siteName: 'Global Giving',
      images: [
        {
          url: activity?.posts_urls ?? '',
        },
      ],
    },
  };
}

export default async function Event({ params }: { params: { id: string } }) {
  const activity: any = await getActivity(params.id);

  return (
    <>
      <main className="responsive-wrapper flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <EventPage activity={activity} />
        </section>
      </main>
    </>
  );
}

type ActivityProps = any;

type Props = {
  feed: ActivityProps[];
};
