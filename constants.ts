import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const EVENT_DESCRIPTION_TEXT_LENGTH = 120;
export const PAST_EVENTS_DESCRIPTION_TEXT_LENGTH = 120;

export const EVENT_LOCATIONS = [
  {
    id: 1,
    name: 'Chennai',
    value: 'Chennai',
    checked: false,
  },
  {
    id: 2,
    name: 'Bangalore',
    value: 'Bangalore',
    checked: false,
  },
  {
    id: 3,
    name: 'North America - Remote',
    value: 'North_America',
    checked: false,
  },
  {
    id: 4,
    name: 'Bellevue',
    value: 'Bellevue',
    checked: false,
  },
  {
    id: 5,
    name: 'San Mateo',
    value: 'San_Mateo',
    checked: false,
  },
  {
    id: 6,
    name: 'Denver',
    value: 'Denver',
    checked: false,
  },
  {
    id: 7,
    name: 'New York',
    value: 'New_York',
    checked: false,
  },
];

export const INCLUDE_ALL_ACTIVITIES_DATA: Partial<
  Prisma.ActivityDeleteArgs<DefaultArgs>
> = {
  include: {
    events: {
      take: 2,
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
    },
    tags: {
      include: {
        tag: true,
      },
    },
    // author: {
    //   select: { name: true },
    // },
  },
};
