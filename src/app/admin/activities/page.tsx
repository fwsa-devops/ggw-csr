
import ActiveEvents from "@/components/events/active-events";
import { getAllActivitiesFromDB } from "@/components/events/utils";

const Page = async () => {

  const activities = await getAllActivitiesFromDB();
  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <ActiveEvents activities={activities} />
        </section>
      </main>
    </>
  )
}

export default Page;