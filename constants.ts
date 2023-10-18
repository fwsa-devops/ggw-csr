export const EVENT_DESCRIPTION_TEXT_LENGTH = 120;
export const PAST_EVENTS_DESCRIPTION_TEXT_LENGTH = 150;

export const EVENT_LOCATIONS = [{
    id: 1,
    name: 'Chennai',
    checked: false
},
{
    id: 2,
    name: 'Banglore',
    checked: false
},
{
    id: 3,
    name: 'Online',
    checked: false
},
]

export const INCLUDE_ALL_ACTIVITIES_DATA = {
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
      tags: {
        include: {
          tag: true,
        },
      },
      author: {
        select: { name: true },
      },
    },
  }