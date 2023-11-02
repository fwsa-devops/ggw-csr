import { getHomepageContent } from '@/components/utils/api';
import { useSsr } from 'usehooks-ts';
import HomepageViewer from './components/viewer';

export default async function Home() {
  const response = await getHomepageContent();
  const { isBrowser } = useSsr();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          {!isBrowser && <HomepageViewer body={response.data.body} />}
        </section>
      </main>
    </>
  );
}

export const revalidate = 30;
