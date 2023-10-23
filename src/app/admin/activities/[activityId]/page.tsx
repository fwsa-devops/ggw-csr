import prisma from "@/lib/prisma";
import ActivityForm from "./components/activity-form";


export default async function ActivityPage({ params }: { params: { activityId: string } }) {

  console.log(params);

  const activity = await prisma.activity.findUnique({
    where: {
      id: params.activityId
    },
    // include: {
    //   events: true,
    //   tags: true,
    //   author: true,
    // }
  })

  return (
    <>
      {JSON.stringify(activity, null, 2)}

      <ActivityForm initialData={activity} />
    </>
  )

}