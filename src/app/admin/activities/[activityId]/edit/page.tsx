import prisma from "@/lib/prisma";
import ActivityForm from "../../components/activity-form";
import { Activity, ActivityTags, Tag } from "@prisma/client";


interface IActivityForm extends Activity {
  tags: string[]
}

export default async function ActivityPage({ params }: { params: { activityId: string } }) {

  console.log(params);

  const activity = await prisma.activity.findUnique({
    where: {
      id: params.activityId
    },
    include: {
      tags: true
    }
  })

  const formData: any = Object.assign({}, { ...activity, tags: activity?.tags.map((_t) => _t.tag_id) })

  console.log("formData", formData);

  return (
    <>

      <main className="flex flex-col items-center justify-between min-h-screen ">
        <section className="w-full text-gray-600 body-font">
          <div className="my-6 space-y-12">
            <div className="lg:w-4/6 mx-auto pb-12 w-full">
              <ActivityForm initialData={formData} />
            </div>
          </div>
        </section>
      </main>

    </>
  )

}