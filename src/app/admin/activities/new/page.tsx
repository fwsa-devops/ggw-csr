import prisma from '@/lib/prisma';
import ActivityForm from '../components/activity-form';

export default async function ActivityPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <div className="my-6 space-y-12">
            <div className="w-4/6 mx-auto border-b border-gray-900/10 pb-12">
              <ActivityForm initialData={null} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
