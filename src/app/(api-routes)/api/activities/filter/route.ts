import prisma from '@/lib/prisma';
import { INCLUDE_ALL_ACTIVITIES_DATA } from '../../../../../../constants';

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  const filters = await req.json();

  // console.log('filters', filters);

  let activities: any[] = [];

  if (filters.tagNames && filters.locations) {
    const _activities = await prisma.activity.findMany({
      where: {
        status: {
          equals: 'OPEN',
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
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });

    for (const activity of _activities) {
      const events = await prisma.event.findMany({
        where: {
          activityId: activity.id,
          city: {
            in: filters.locations,
          },
        },
        include: {
          leaders: {
            include: {
              user: true,
            },
          },
          volunteers: {
            include: {
              user: true,
            },
          },
        },
      });
      activity['events'] = events;
    }

    activities = _activities;
  }

  if (filters.tagNames && !filters.locations) {
    const _activities = await prisma.activity.findMany({
      where: {
        status: {
          equals: 'OPEN',
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
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });

    activities = _activities;
  }

  if (!filters.tagNames && filters.locations) {
    const events = await prisma.event.findMany({
      where: {
        city: {
          in: filters.locations,
        },
        activity: {
          status: {
            equals: 'OPEN',
          },
        },
      },
      include: {
        leaders: {
          include: {
            user: true,
          },
        },
        volunteers: {
          include: {
            user: true,
          },
        },
      },
    });

    // console.log('events', events);

    const _activityIds = events
      .map((event) => event.activityId)
      .filter(onlyUnique);
    // console.log('_activityIds', _activityIds);

    const _activities = await prisma.activity.findMany({
      where: {
        id: {
          in: _activityIds,
        },
      },
      ...INCLUDE_ALL_ACTIVITIES_DATA,
    });
    // console.log('_activities', _activities);

    _activities.forEach((activity) => {
      activity['events'] = events.filter(
        (event) => event.activityId === activity.id,
      );
    });

    activities = _activities;
  }

  // console.log('final activities', (activities));
  return Response.json(
    activities.filter((activity) => activity.events.length > 0),
  );
}
