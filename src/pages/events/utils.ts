import prisma from '@/lib/prisma';

// Transform the Date objects to serializable format
export const serializeActivities = (activities) => {
  return activities.map((activity) => {
    // Format the date as a string in the desired format
    const formattedStartDate = activity.startTime?.toISOString(); // You can use other date formatting methods
    const formattedEndDate = activity.endTime?.toISOString(); // You can use other date formatting methods
    const events = activity.events?.map((event) => {
      const startTime = event.startTime?.toISOString();
      const endTime = event.endTime?.toISOString();
      const leaders = event.leaders.map((leader) => ({
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
        leaders: leaders,
        startTime: startTime,
        endTime: endTime,
      };
    });
    return {
      ...activity,
      events: events,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    };
  });
};

export const getAllActivities = async () => {
  const activities = await prisma.activity.findMany({
    where: { published: true },
    include: {
      events: {
        include: {
          leaders: {
            include: {
              user: true,
            },
          },
          users: true,
        },
      },
      author: {
        select: { name: true },
      },
    },
  });
  //   console.log('activities', activities);

  return activities;
};
