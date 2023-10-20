import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../constants';

// GET /api/activities
// return all activities
export async function GET(req: Request) {
  const activities = await prisma.activity.findMany({
    where: { status: 'OPEN' },
    ...INCLUDE_ALL_ACTIVITIES_DATA,
  });
  return Response.json(activities);
}
