import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../../constants';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  // pass time, tag, location as filterBy
  console.log('req', req);
  const { searchParams } = new URL(req.url);

  const filterBy = searchParams.get('filterBy');

  const filters = await req.json();

  console.log('req.body', filters);

  if (filterBy === 'TIME') {
    const activities = await prisma.activity.findMany({
      where: {
        AND: {
          startTime: {
            gte: filters.from,
          },
          endTime: {
            lte: filters.to,
          },
        },
      },
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });
    return Response.json(activities);
  } else if (filterBy === 'LOCATION') {
    const activities = await prisma.activity.findMany({
      where: {
        place: {
          in: filters.locations,
        },
      },
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });
    return Response.json(activities);
  } else {
    const activities = await prisma.activity.findMany({
      where: {
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
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });
    return Response.json(activities);
  }
}
