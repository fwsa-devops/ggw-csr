
import ActiveEvents from '@/components/events/active-events';
import {
  getAllActivitiesFromDB,
} from '@/components/events/utils';
import { getHomepageContent } from '@/components/events/utils/api';
import HomepageViewer from './components/viewer';

export default async function Home() {

  const activities = await getAllActivitiesFromDB();

  const response = await getHomepageContent();

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">

          {/* <ActiveEvents activities={activities} /> */}

          {/* <div
            className='tiptap ProseMirror w-full text-black mt-10'
            dangerouslySetInnerHTML={{ __html: response.data.body }}
          >
          </div> */}

          <HomepageViewer body={response.data.body} />

        </section>
      </main>

    </>
  );
}

export const revalidate = 30;