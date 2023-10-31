import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../../constants';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  const filters = await req.json();

  // const activities = await prisma.activity.findMany({
  //   take: 10,
  //   where: {
  //     AND: {
  //       city: {
  //         in: filters.locations,
  //       },
  //       tags: {
  //         some: {
  //           tag: {
  //             name: {
  //               in: filters.tagNames,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   ...INCLUDE_ALL_ACTIVITIES_DATA,
  // });

  const activities = await prisma.activity.findMany({
    take: 10,
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
      events: {
        some: {
          city: {
            in: filters.city,
          },
          // OR: [
          //   {
          //     is_dates_announced: true,
          //     startTime: {
          //       gte: filters.startDate, // Assuming filters.startDate contains the start date you want to filter by
          //     },
          //   },
          //   {
          //     is_dates_announced: true,
          //     endTime: {
          //       lte: filters.endDate, // Assuming filters.endDate contains the end date you want to filter by
          //     },
          //   },
          // ]
        },
      },
    },
    ...INCLUDE_ALL_ACTIVITIES_DATA,
  });

  console.log('activities', activities);
  return Response.json(activities);
}
