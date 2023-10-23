import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../constants';
import { activityFormSchema } from '@/types';
import { NextResponse } from 'next/server';

// GET /api/activities
// return all activities
export async function GET(req: Request) {
  const activities = await prisma.activity.findMany({
    where: { status: 'OPEN' },
    ...INCLUDE_ALL_ACTIVITIES_DATA,
  });
  return Response.json(activities);
}


export async function POST(req: Request, res: Response) {

  const body: unknown = await req.json();
  console.log(body);

  const formData = activityFormSchema.safeParse(body);

  let zodErrors = {};

  if (!formData.success) {
    formData.error.issues.forEach(issue => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })

    return NextResponse.json({
      errors: zodErrors
    })
  }

  const response = await prisma.activity.create(
    {
      data: formData.data,
    }
  )

  return NextResponse.json(
    { success: true, data: response }
  )

}