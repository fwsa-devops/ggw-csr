import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../constants';

// GET /api/activities
// return all activities
export default async function handle(req, res) {
  if (req.method === 'GET') {
    const activities = await prisma.activity.findMany({
      where: { published: true },
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });

    res.json(activities);
  }
}
