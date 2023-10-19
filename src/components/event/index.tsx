'use client';

import React from 'react';
import {
  convertToReadableDate,
  isUserPartOfActivity,
  shortenDate,
} from '../events/utils';
import { BuildingIcon, LaptopIcon, MapPinIcon, TimerIcon } from 'lucide-react';
import EventJoinButton from '../events/event-join-button';
import ListUsers from './list-users';

const EventPage = (props) => {
  const { activity } = props;
  const [alreadyJoinedActivity, setAlreadyJoinedActivity] =
    React.useState(false);

  const checkUserAlreadyRegistered = async () => {
    const result = await isUserPartOfActivity();
    setAlreadyJoinedActivity(result);
  };

  React.useEffect(() => {
    checkUserAlreadyRegistered();
  }, [activity]);

  return (
    <div
      className="container h-auto px-0 mx-auto my-10 w-100 bg-grey"
      key={activity.id}
    >
      <div className="flex mx-auto event-container md:flex-nowrap md:h-600 lg:gap-8">
        <div className="w-full mt-6 lg:w-1/2 lg:mt-0">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700 title-font">
            {activity.name}
          </h1>
          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{activity?.place}</p>
          </div>
          <h2 className="mt-2 mb-4 text-sm tracking-widest text-gray-400 title-font">
            {activity?.tags?.tag?.name || '#CSR #Helping'}
          </h2>

          <p className="leading-relaxed">{activity.description}</p>
          <div className="flex items-center pb-5 mt-6 mb-0 text-md">
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <div className="mr-3 font-semibold">Duration: </div>
                <time
                  dateTime={convertToReadableDate(activity.startTime)}
                  suppressHydrationWarning
                >
                  {convertToReadableDate(activity.startTime)} to{' '}
                  {convertToReadableDate(activity.endTime)}
                </time>
              </div>
            </div>
          </div>
        </div>
        <img
          alt="ecommerce"
          className="object-cover object-center w-full rounded"
          src={activity.cover || ''}
        />
      </div>

      <div className="mt-12">
        <h2 className="pb-2 pl-1 mb-2 text-2xl font-semibold text-gray-700">
          Events
        </h2>
        {activity.events.map((event: any) => (
          <div
            className="p-6 py-4 mt-6 border border-b-2 shadow rounded-xl bg-card text-card-foreground join-event"
            key={event.id}
          >
            <div className="flex justify-between text-sm text-gray-700 event-timings align-center">
              <div>
                <div className="mb-4 text-xl font-semibold tracking-tight">
                  <time
                    dateTime={convertToReadableDate(activity.startTime)}
                    suppressHydrationWarning
                  >
                    {shortenDate(event.startTime)} to{' '}
                    {shortenDate(event.endTime)}
                  </time>
                </div>
                <div className="flex gap-6 mb-2 location align-center">
                  <div className="flex gap-1">
                    <MapPinIcon size="20" />
                    <p>{event?.place}</p>
                  </div>
                  <div className="flex gap-1">
                    <BuildingIcon size="20" />
                    <p>{event?.address}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 event-duration gap-x-1">
                    <TimerIcon size="18" />
                    {((new Date(event.endTime) as any) -
                      (new Date(event.startTime) as any)) /
                      (1000 * 60 * 60)}{' '}
                    hrs
                  </div>
                </div>
              </div>{' '}
              <div>
                {event?.leaders && event?.leaders.length ? (
                  <ListUsers
                    stacked
                    users={event?.leaders}
                    title="Event Leaders"
                  />
                ) : null}
              </div>
            </div>

            <EventJoinButton
              extended
              event={event}
              onJoin={() => {
                checkUserAlreadyRegistered();
              }}
              alreadyJoinedActivity={alreadyJoinedActivity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
