import React from 'react';
import Link from 'next/link';
import { getActivityDescription } from '@/components/utils';
import { Button } from '@/components/ui/button';
import EventListItem from './EventIListItem';
import { IActivity } from '@/types';

const ActivityListItem = ({ activity }: { activity: IActivity }) => {
  activity.events.length = 2;

  console.log('ActivityListItem', activity);

  return (
    <div
      id={activity.id}
      className="flex flex-wrap gap-6 p-4 mx-auto event-container lg:flex-nowrap"
    >
      <Link
        className="flex lg:w-1/3 max-h-[320px] md:max-h-[320px] w-full"
        href={`/activities/${activity.id}`}
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full rounded"
          src={activity.cover}
        />
      </Link>

      <div className="w-full mt-6 lg:w-1/3 lg:mt-0">
        <Link href={`/activities/${activity.id}`}>
          <h1 className="mb-2 text-xl font-semibold text-gray-700 title-font">
            {activity.name}
          </h1>
        </Link>

        {/* <div className="flex gap-2 mb-2 text-gray-700 location items-center">
          <MapPin size="18" />
          <p className="text-sm">{activity?.city}</p>
        </div> */}

        <h2 className="mb-1 text-sm tracking-widest text-gray-400 title-font">
          {activity.tags && activity?.tags?.length > 0
            ? activity?.tags.map((tag) => `#${tag?.tag.name}`).join(', ')
            : 'No tags available'}
        </h2>

        <p className="leading-relaxed">{getActivityDescription(activity)}</p>

        <div className="flex items-center pb-5 mt-2 mb-0 text-sm">
          <div className="flex flex-col gap-y-2">
            <p>
              <strong className="mr-3">Duration: </strong>
              {activity?.duration} minutes
            </p>
          </div>
        </div>

        <div className="flex">
          <Link href={`/activities/${activity.id}`}>
            <Button size="sm" variant="default">
              Learn more
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full participants lg:pl-5 lg:w-1/3 ">
        <h2 className="pb-2 mb-2 text-xl font-medium text-gray-700 ">Events</h2>

        {activity.events.map((event: any) => (
          <EventListItem
            activity={activity}
            isPartOfThisEvent={true}
            event={event}
            size="sm"
            isPartOfAnyEvent={false}
            key={event.id}
            participatedEvents={null}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ActivityListItem);
