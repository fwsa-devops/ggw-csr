import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../../constants';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  // pass time, tag, location as filterBy
  console.log('req', req);

  const filters = await req.json();

  console.log('req.body', filters);

  const activities = await prisma.activity.findMany({
    where: {
      AND: {
        startTime: {
          gte: filters.from,
        },
        endTime: {
          lte: filters.to,
        },
        place: {
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
  console.log('activities', activities);

  return Response.json(activities);
}
