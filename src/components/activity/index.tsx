'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { MapPin, CalendarRangeIcon } from 'lucide-react';
import React from 'react';
import EventJoinButton from '../events/event-join-button';
import { getActivityDescription } from '../events/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

const ActivityComponent = ({ activity }) => {
  return (
    <div className="flex flex-wrap gap-6 p-4 mx-auto event-container md:flex-nowrap md:h-600">
      <Link
        className="flex lg:w-1/3 lg:h-100 max-h-72"
        href={`/activities/${activity.id}`}
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full rounded"
          src={activity.cover || ''}
        />
      </Link>

      <div className="w-full mt-6 lg:w-1/3 lg:mt-0">
        <h1 className="mb-1 text-xl font-semibold text-gray-700 title-font">
          {activity.name}
        </h1>
        <div className="flex gap-2 mb-2 text-gray-700 location items-center">
          <MapPin size="18" />
          <p className="text-sm">{activity?.city}</p>
        </div>
        <h2 className="mb-1 text-sm tracking-widest text-gray-400 title-font">
          {activity?.tags.length > 0
            ? activity?.tags.map((tag) => `#${tag?.tag.name}`).join(', ')
            : 'No tags available'}
        </h2>

        <p className="leading-relaxed">{getActivityDescription(activity)}</p>
        <div className="flex items-center pb-5 mt-2 mb-0 text-sm">
          <div className="flex flex-col gap-y-2">
            <p>
              <strong className="mr-3">Duration: </strong>
              {activity?.duration} minutes
              {/* <time
            dateTime={convertToReadableDate(activity.startTime)}
            suppressHydrationWarning
          >
            {convertToReadableDate(activity.startTime)} to{' '}
            {convertToReadableDate(activity.endTime)}
          </time> */}
            </p>
          </div>
        </div>
        <div className="flex">
          <Link href={`/activities/${activity.id}`}>
            <Button size="sm" variant="outline">
              Learn more
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full pl-5 participants lg:w-1/3 ">
        <h2 className="pb-2 mb-2 text-xl font-medium text-gray-700 ">Events</h2>
        {activity.events.map((event: any) => (
          <React.Fragment key={event.id}>
            <Separator className="mb-4 mt-46" />
            <Link href={`/activities/${activity.id}`}>
              <div className="join-event">
                <div className="flex justify-between my-2 text-sm text-gray-700 event-timings align-center">
                  {/* <time
                dateTime={convertToReadableDate(
                  activity.startTime,
                )}
                suppressHydrationWarning
              >
                {shortenDate(event.startTime)} to{' '}
                {shortenDate(event.endTime)}
              </time> */}
                  <div className="flex items-center text-sm text-gray-700 event-duration gap-x-1">
                    <CalendarRangeIcon size="18" />
                    {event.is_dates_announced
                      ? ((new Date(event.endTime as any).getTime() as any) -
                          (new Date(event.startTime as any).getTime() as any)) /
                          (1000 * 60 * 60) +
                        ' hrs'
                      : event.date_announcement_text}
                  </div>
                </div>
                <EventJoinButton event={event} alreadyJoinedActivity={true} />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ActivityComponent);
