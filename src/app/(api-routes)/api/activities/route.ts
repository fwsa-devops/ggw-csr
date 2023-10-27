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
  const formData = activityFormSchema.safeParse(body);

  let zodErrors = {};

  if (!formData.success) {
    formData.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return NextResponse.json({
      errors: zodErrors,
    });
  }

  let response: any = null;

  if (formData.data.id) {
    response = await prisma.activity.update({
      where: {
        id: formData.data.id,
      },
      data: {
        ...formData.data,
        tags: {},
      },
    });
  } else {
    response = await prisma.activity.create({
      data: {
        ...formData.data,
        tags: {},
      },
    });
  }

  if (response === null) {
    return NextResponse.json({ error: 'Failed to UPSERT activity' });
  }

  // REMOVE old Tags
  await prisma.activityTags.deleteMany({
    where: {
      activity_id: response.id,
    },
  });

  // REMOVE old Tags
  await prisma.activityTags.createMany({
    skipDuplicates: true,
    data: formData.data.tags.map((t) => ({
      tag_id: t,
      activity_id: response.id,
    })),
  });

  return NextResponse.json({ success: true, data: response });
}

// need to implement delete activity feature & also delete respective Posts from UploadThing
