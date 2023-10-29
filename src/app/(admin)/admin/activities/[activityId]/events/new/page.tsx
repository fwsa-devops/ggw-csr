import ActivityEventForm from '../../components/activity-event-form';

export default async function ActivityPage() {

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <div className="my-6 space-y-12">
            <div className="md:w-4/6 w-full mx-auto border-b border-gray-900/10 pb-12">
              <ActivityEventForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
