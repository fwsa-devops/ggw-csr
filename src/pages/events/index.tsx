import React from 'react';
import './event.css';
import { EVENT_DESCRIPTION_LENGTH } from '../../../constants';
import 'tailwindcss/tailwind.css';
import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';
import ProgressBar from '../../components/ui/progress-bar';
import { serializeActivities, getAllActivities } from './utils';
import Link from 'next/link';

type EventsComponentProps = {
  activities?: any[];
};

export const getServerSideProps = async (context) => {
  const activities = await getAllActivities();
  // console.log('activities', activities);

  const serializedActivities = serializeActivities(activities);
  // console.log('serializedActivities', serializedActivities);
  return {
    props: {
      activities: serializedActivities,
    },
  };
};

const EventsComponent = (props: any) => {
  let { activities } = props;

  console.log('activities', activities);

  // const { data: session } = useSession();

  const session = {
    user: {
      email: 'mohammed.hasan@freshworks.com',
      name: 'Hasan',
      image: 'dummy',
    },
  };

  const getDescription = (activity) => {
    return activity.description.length > EVENT_DESCRIPTION_LENGTH
      ? `${activity.description.slice(0, EVENT_DESCRIPTION_LENGTH)}...`
      : activity.description;
  };

  const convertToReadableDate = (isoDate) => {
    console.log('isoDate', isoDate, typeof isoDate);

    const options: any = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString(undefined, options);
    console.log('formattedDate', formattedDate);

    return formattedDate ?? 'None';
  };

  const shortenDate = (isoDate) => {
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

  const isAlreadyJoined = () => {
    if (session?.user) {
      const user = prisma.user.findUnique({
        where: {
          email: session.user.email || '',
        },
      });
      console.log('user', user, 'session', session);
      return !user;
    }
  };

  const joinEvent = () => {
    prisma.user.create({
      data: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
    });
    // need to add toaster
    isAlreadyJoined();
  };

  // console.log('activities', activities);

  return activities?.map((activity: any) => {
    return (
      <div
        className="container w-100 h-auto px-5 mx-auto my-10 bg-grey"
        key={activity.id}
      >
        <div className="mx-auto flex event-container md:flex-nowrap md:h-600">
          <img
            alt="ecommerce"
            className="lg:w-1/3 w-full lg:h-100 object-cover object-center rounded"
            src={activity.cover || ''}
          />

          <div className="lg:w-1/3 w-full mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
              {activity.name}
            </h1>
            <div className="location flex align-center">
              <svg
                width="15"
                height="23"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p>{activity?.place}</p>
            </div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              #CSR #Helping #ChildrenGrowth
            </h2>

            <div className="flex mb-4 my-3">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500 mx-2">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 mx-2">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 mx-2">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{getDescription(activity)}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 mb-5">
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
              <Link href={`/events/${activity.id}`}>
                <button className="mr-auto w-72 text-indigo-500 ease-in-out duration-300 hover:text-white border border-indigo-500 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Learn more...
                </button>
              </Link>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* <div className="inline-block h-[250px] min-h-[1em] w-1 self-stretch bg-black opacity-100"></div> */}

          <div className="participants pl-5 lg:w-1/3 w-full ">
            <h2 className="text-gray-900 text-2xl title-font font-medium border-b-2 mb-5 py-2">
              Events
            </h2>
            {activity.events.map((evnt: any) => (
              <>
                <div className="join-event">
                  <div className="event-timings my-2 flex align-center justify-between">
                    {' '}
                    <time
                      dateTime={convertToReadableDate(activity.startTime)}
                      suppressHydrationWarning
                    >
                      {shortenDate(evnt.startTime)} to{' '}
                      {shortenDate(evnt.endTime)}
                    </time>
                    <div className="event-duration flex gap-x-1 items-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      {((new Date(evnt.endTime) as any) -
                        (new Date(evnt.startTime) as any)) /
                        (1000 * 60 * 60)}{' '}
                      hrs
                    </div>
                  </div>
                  <ProgressBar value={evnt?.count} />
                  <div className="event-details flex my-3">
                    <strong>{`${evnt?.users?.length} / ${evnt?.count}`}</strong>
                    <button
                      // disabled={!session || isAlreadyJoined()}
                      // onClick={joinEvent}
                      className=" py-1 border border-indigo-500 focus:outline-none px-2 ml-auto text-sm w-32 rounded text-indigo-500"
                    >
                      + Join Event
                    </button>
                  </div>
                </div>
                {/* <Avatar>
                      {leader?.user?.image && (
                        <AvatarImage src={leader?.user?.image} />
                      )}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  });
};

export default EventsComponent;
