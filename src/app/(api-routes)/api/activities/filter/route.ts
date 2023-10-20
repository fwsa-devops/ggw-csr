import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../../constants';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  const filters = await req.json();

  const activities = await prisma.activity.findMany({
    take: 10,
    where: {
      AND: {
        // startTime: {
        //   gte: filters.from,
        // },
        // endTime: {
        //   lte: filters.to,
        // },
        city: {
          in: filters.locations,
        },
        tags: {
          some: {
            tag: {
              name: {
                in: filters.tagNames,
              },
            },
          },
        },
      },
    },
    ...INCLUDE_ALL_ACTIVITIES_DATA,
  });

  // console.log('activities', activities);
  return Response.json(activities);
}
