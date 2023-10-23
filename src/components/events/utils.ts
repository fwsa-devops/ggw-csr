import prisma from '@/lib/prisma';
import { EVENT_DESCRIPTION_TEXT_LENGTH } from '../../../constants';
import {
  checkUserAlreadyRegistered,
  getActivitiesBasedOnFilters,
  getAllActivities,
  getAllTagsFromDB,
} from './utils/api';

// Transform the Date objects to serializable format
export const serializeActivities = (object) => {
  if (Array.isArray(object)) {
    return object.map((activity) => {
      const formattedStartDate = activity.startTime?.toISOString();
      const formattedEndDate = activity.endTime?.toISOString();
      const events = activity?.events?.map((event) => {
        const startTime = event.startTime?.toISOString();
        const endTime = event.endTime?.toISOString();
        const leaders = event?.leaders?.map((leader) => ({
          ...leader,
          assignedAt: leader.assignedAt.toISOString(),
          user: {
            ...leader.user,
            createdAt: leader.user?.createdAt.toISOString(),
            updatedAt: leader.user?.updatedAt.toISOString(),
          },
        }));
        return {
          ...event,
          leaders: leaders || null,
          users: event?.users || null,
          startTime: startTime,
          endTime: endTime,
        };
      });
      return {
        ...activity,
        events: events || null,
        startTime: formattedStartDate,
        endTime: formattedEndDate,
      };
    });
  } else {
    const activity = object;
    const formattedStartDate = activity.startTime?.toISOString(); // You can use other date formatting methods
    const formattedEndDate = activity.endTime?.toISOString(); // You can use other date formatting methods
    const events = activity?.events?.map((event) => {
      const startTime = event.startTime?.toISOString();
      const endTime = event.endTime?.toISOString();
      const leaders = event?.leaders?.map((leader) => ({
        ...leader,
        assignedAt: leader.assignedAt.toISOString(),
        user: {
          ...leader.user,
          createdAt: leader.user?.createdAt.toISOString(),
          updatedAt: leader.user?.updatedAt.toISOString(),
        },
      }));
      return {
        ...event,
        leaders: leaders || null,
        startTime: startTime,
        endTime: endTime,
      };
    });
    return {
      ...activity,
      events: events || null,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    };
  }
};

export const getAllActivitiesFromDB = async () => {
  const activities = await getAllActivities();
  return activities;
};

export const getPastActivities = async () => {
  const pastActivities = await prisma.activity.findMany({
    where: {
      // endTime: {
      //   lt: new Date(),
      // },
    },
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: { events: true },
      },
    },
  });
  console.log('pastActivities', pastActivities);

  return pastActivities;
};

export const getActivity = async (activityId: string) => {
  let activity = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
    include: {
      events: {
        include: {
          leaders: {
            include: {
              user: true,
            },
          },
          volunteers: {
            include: {
              user: {
                select: { email: true, name: true, image: true },
              },
            },
          },
        },
      },
      author: {
        select: { name: true },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  return activity;
};

export const getActivityDescription = (activity) => {
  return activity.description.length > EVENT_DESCRIPTION_TEXT_LENGTH
    ? `${activity.description.slice(0, EVENT_DESCRIPTION_TEXT_LENGTH)}...`
    : activity.description;
};

export const convertToReadableDate = (isoDate) => {
  const options: any = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate ?? 'None';
};

export const shortenDate = (isoDate) => {
  const options: any = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    hour12: true,
  };
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate ?? 'None';
};

export const isUserPartOfActivity = async () => {
  const result = await checkUserAlreadyRegistered();
  return result;
};

export const getFilteredActivities = async (filters) => {
  const filteredActivities = await getActivitiesBasedOnFilters(filters);
  return filteredActivities;
};

export const getAllTags = async () => {
  const tags = await getAllTagsFromDB();
  return tags;
};

export const addPropertyIfValueExists = (obj, propertyName, value) => {
  if (value && (Array.isArray(value) ? value.length > 0 : true)) {
    obj[propertyName] = value;
  }
};

// Manual SQL queries on nested models
// const result = await prisma.$queryRaw`
//   SELECT *
//   FROM eventUser
//   JOIN user ON eventUser.userId = user.id
//   WHERE user.email = ${userEmail}
// `;
