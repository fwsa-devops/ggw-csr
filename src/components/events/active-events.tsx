import React from 'react';
import Link from 'next/link';
import {
  convertToReadableDate,
  getActivityDescription,
  shortenDate,
} from './utils';
import { LaptopIcon, TimerIcon } from 'lucide-react';
import { Button } from '../ui/button';
import EventJoinButton from './event-join-button';
import { Separator } from '../ui/separator';

const ActiveEvents = (props) => {
  const { activities } = props;

  return activities?.map((activity: any) => {
    return (
      <div
        className="container h-auto px-0 mx-auto my-10 border border-b-2 shadow w-100 bg-grey rounded-xl bg-card text-card-foreground "
        key={activity.id}
      >
        <div className="flex gap-6 p-4 mx-auto event-container md:flex-nowrap md:h-600">
          <Link
            className="flex lg:w-1/3 lg:h-100 max-h-72"
            href={`/${activity.id}`}
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
            <div className="flex gap-2 mb-2 text-gray-700 location align-center">
              <LaptopIcon size="18" />
              <p className="text-sm">{activity?.place}</p>
            </div>
            <h2 className="mb-1 text-sm tracking-widest text-gray-400 title-font">
              #CSR #Helping
            </h2>

            <p className="leading-relaxed">
              {getActivityDescription(activity)}
            </p>
            <div className="flex items-center pb-5 mt-2 mb-0 text-sm">
              <div className="flex flex-col gap-y-2">
                <p>
                  <strong className="mr-3">Duration: </strong>
                  <time
                    dateTime={convertToReadableDate(activity.startTime)}
                    suppressHydrationWarning
                  >
                    {convertToReadableDate(activity.startTime)} to{' '}
                    {convertToReadableDate(activity.endTime)}
                  </time>
                </p>
              </div>
            </div>
            <div className="flex">
              <Link href={`/${activity.id}`}>
                <Button size="sm" variant="outline">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          {/* <div className="inline-block h-[250px] min-h-[1em] w-1 self-stretch bg-black opacity-100"></div> */}

          <div className="w-full pl-5 participants lg:w-1/3 ">
            <h2 className="pb-2 mb-2 text-xl font-medium text-gray-700 ">
              Events
            </h2>
            {activity.events.map((event: any) => (
              <>
                <Separator className="mb-4 mt-46" />
                <Link href={`/${activity.id}`}>
                  <div className="join-event">
                    <div className="flex justify-between my-2 text-sm text-gray-700 event-timings align-center">
                      {' '}
                      <time
                        dateTime={convertToReadableDate(activity.startTime)}
                        suppressHydrationWarning
                      >
                        {shortenDate(event.startTime)} to{' '}
                        {shortenDate(event.endTime)}
                      </time>
                      <div className="flex items-center text-sm text-gray-700 event-duration gap-x-1">
                        <TimerIcon size="18" />
                        {((new Date(event.endTime) as any) -
                          (new Date(event.startTime) as any)) /
                          (1000 * 60 * 60)}{' '}
                        hrs
                      </div>
                    </div>
                    <EventJoinButton extended={false} event={event} />
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  });
};

export default ActiveEvents;