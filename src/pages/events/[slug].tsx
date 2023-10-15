import {
  convertToReadableDate,
  getActivity,
  shortenDate,
} from '@/components/events/utils';
import { serializeActivities } from '@/components/events/utils';
import 'tailwindcss/tailwind.css';
import React from 'react';
import ProgressBar from '@/components/ui/progress-bar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  let activity = await getActivity(slug);
  activity = serializeActivities(activity);
  return { props: { activity: activity } };
};

const EventDetail = (props) => {
  const { activity } = props;

  return (
    <div>
      {JSON.stringify(activity)}
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              {activity?.tags?.map((tag) => (
                <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                  {tag}
                </span>
              ))}
              <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {activity.name}
              </h2>
              <p className="leading-relaxed mb-8">{activity.description}</p>
              <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                <a className="text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  6
                </span>
              </div>
              <a className="inline-flex items-center">
                <img
                  alt="blog"
                  src="https://dummyimage.com/104x104"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <Avatar>
                  {/* {leader?.user?.image && ( */}
                  <AvatarImage src={'https://dummyimage.com/104x104'} />
                  {/* )} */}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Holden Caulfield
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    UI DEVELOPER
                  </span>
                </span>
              </a>
            </div>
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              <img src={activity?.cover} alt="Activity image" />
            </div>
          </div>
        </div>
      </section>
      <div className="participants pl-5 lg:w-1/3 w-full ">
        <h2 className="text-gray-900 text-2xl title-font font-medium border-b-2 mb-5 py-2">
          Events
        </h2>
        {activity.events?.map((evnt: any) => (
          <>
            <div className="join-event">
              <div className="event-timings my-2 flex align-center justify-between">
                {' '}
                <time
                  dateTime={convertToReadableDate(activity.startTime)}
                  suppressHydrationWarning
                >
                  {shortenDate(evnt.startTime)} to {shortenDate(evnt.endTime)}
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
  );
};

export default EventDetail;
