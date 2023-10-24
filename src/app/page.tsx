import { getHomepageContent } from '@/components/events/utils/api';
import HomepageViewer from './components/viewer';

export default async function Home() {

  const response = await getHomepageContent();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">

          <HomepageViewer body={response.data.body} />

        </section>
      </main>

    </>
  );
}

export const revalidate = 30;
