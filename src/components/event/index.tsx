'use client';

import React from 'react';
import {
  isUserPartOfActivity,
} from '../events/utils';
import {
  BuildingIcon,
  CalendarRangeIcon,
  LaptopIcon,
  MapPinIcon,
  PenIcon,
} from 'lucide-react';
import EventJoinButton from '../events/event-join-button';
import ListUsers from './list-users';
import {
  Activity,
  ActivityTags,
  Event,
  EventLeader,
  Tag,
  User,
  Volunteers,
} from '@prisma/client';
import { Button } from '../ui/button';
import Link from 'next/link';

interface IActivity extends Activity {
  events: ({
    volunteers: ({ user: User } & Volunteers)[];
    leaders: EventLeader[];
  } & Event)[];
  tags: ({ tag: Tag } & ActivityTags)[];
  author: { name: String };
}

const EventPage = (props: { activity: IActivity }) => {
  const { activity } = props;

  console.log("activity", activity)

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
      className="container h-auto px-0 mx-auto mb-10 w-100 bg-grey"
      key={activity.id}
    >
      <div className="flex flex-wrap flex-col mx-auto event-container md:flex-nowrap md:h-600 lg:gap-8">

        <div className="order-1 lg:order-1 lg:w-full">
          <img
            alt="ecommerce"
            className=" lg:aspect-video lg:max-h-[420px]  object-cover object-center w-full rounded"
            src={activity.cover || ''}
          />
        </div>

        <div className="w-full mt-12 lg:mt-6 lg:mx-auto lg:order-2 order-2 ">
          <div className="flex justify-between">

            <h1 className="mb-4 text-2xl font-semibold text-gray-700 title-font">
              {activity.name}
            </h1>

            <Link href={`/admin/activities/${activity.id}/edit`} >
              <Button
                variant={'default'}
              >
                <PenIcon size={18} className='mr-3' />
                Edit
              </Button>
            </Link>

          </div>

          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{activity?.city}</p>
          </div>
          <h2 className="mt-2 mb-3 text-sm tracking-widest text-gray-400 title-font">
            {activity?.tags.map((tag) => (
              <span key={tag.id} className="mr-2">
                #{tag?.tag.name}
              </span>
            ))}
          </h2>

          <div className="flex items-center pb-5 mt-3 mb-0 text-md">
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <div className="mr-3 font-semibold">Duration: </div>
                {activity.duration} minutes
                {/* <time
                  dateTime={convertToReadableDate(activity.startTime)}
                  suppressHydrationWarning
                >
                  {convertToReadableDate(activity.startTime)} to{' '}
                  {convertToReadableDate(activity.endTime)}
                </time> */}
              </div>
            </div>
          </div>

          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: activity.description ?? '' }}
          ></div>
          {/* <Markdown>{activity.description}</Markdown> */}
          {/* <ReactMarkdown children={activity.description ?? ''} /> */}
        </div>

      </div>

      <div className="mt-12">
        <h2 className="pb-2 pl-1 mb-2 text-2xl font-semibold text-gray-700">
          Events
        </h2>
        {activity.events.map((event) => (
          <div
            className="p-6 py-4 mt-6 border border-b-2 shadow rounded-xl bg-card text-card-foreground join-event"
            key={event.id}
          >
            <div className="flex justify-between text-sm text-gray-700 md:flex-nowrap flex-wrap event-timings align-center">
              <div className="flex align-center">
                {/* <div className="mb-4 text-xl font-semibold tracking-tight">
                  <time
                    dateTime={convertToReadableDate(activity.startTime)}
                    suppressHydrationWarning
                  >
                    {shortenDate(event.startTime)} to{' '}
                    {shortenDate(event.endTime)}
                  </time>
                </div> */}
                <div className="flex lg:flex-nowrap flex-wrap gap-6 mb-2 location align-center">
                  <div className="flex gap-1 md:items-center">
                    <MapPinIcon size="20" />
                    <p>{event?.city}</p>
                  </div>
                  <div className="flex gap-1 md:items-center">
                    <BuildingIcon size="20" />
                    <p>{event?.location}</p>
                  </div>
                  <div className="flex md:items-center items-start text-sm text-gray-700 event-duration gap-x-1">
                    <CalendarRangeIcon size="18" />

                    {event.is_dates_announced
                      ? ((new Date(event.endTime as any).getTime() as any) -
                        (new Date(event.startTime as any).getTime() as any)) /
                      (1000 * 60 * 60) +
                      'hrs'
                      : event.date_announcement_text}
                  </div>
                </div>
              </div>{' '}
              <div>
                {event?.leaders && event?.leaders.length ? (
                  <ListUsers
                    stacked={false}
                    users={event?.leaders}
                    separateUsers
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
    </div >
  );
};

export default EventPage;
