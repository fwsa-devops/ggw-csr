import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../constants';

// POST /api/filter
// return filtered activities
export default async function handle(req, res) {
  if (req.method === 'POST') {
    // pass time, tag, location as filterBy
    const filterBy = req.query.filterBy;

    const filters = req.body;

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
      res.json(activities);
    } else if (filterBy === 'LOCATION') {
      const activities = await prisma.activity.findMany({
        where: {
          place: {
            in: filters.locations,
          },
        },
        ...INCLUDE_ALL_ACTIVITIES_DATA,
      });
      res.json(activities);
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
      res.json(activities);
    }
  }
  res.json('Unkown request');
}
