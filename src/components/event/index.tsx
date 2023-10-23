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
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';

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

  // console.log("activity", activity)

  const [alreadyJoinedActivity, setAlreadyJoinedActivity] =
    React.useState(false);

  const checkUserAlreadyRegistered = async () => {
    const result = await isUserPartOfActivity();
    setAlreadyJoinedActivity(result);
  };

  React.useEffect(() => {
    checkUserAlreadyRegistered();
  }, [activity]);

  // const description = `# Markdown syntax guide

  // ## Headers

  // # This is a Heading h1
  // ## This is a Heading h2
  // ###### This is a Heading h6

  // ## Emphasis

  // *This text will be italic*
  // _This will also be italic_

  // **This text will be bold**
  // __This will also be bold__

  // _You **can** combine them_

  // ## Lists

  // ### Unordered

  // * Item 1
  // * Item 2
  // * Item 2a
  // * Item 2b

  // ### Ordered

  // 1. Item 1
  // 2. Item 2
  // 3. Item 3
  //     1. Item 3a
  //     2. Item 3b

  // ## Images

  // ![This is an alt text.](/image/sample.webp "This is a sample image.")

  // ## Links

  // You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

  // ## Blockquotes

  // > Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
  // >
  // >> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

  // ## Tables

  // | Left columns  | Right columns |
  // | ------------- |:-------------:|
  // | left foo      | right foo     |
  // | left bar      | right bar     |
  // | left baz      | right baz     |

  // ## Blocks of code

  // ## Inline code

  // This web site is using
  // `;

  // useEffect(() => {

  //   (() => {
  //     const processedContent = remark()
  //       .use(html)
  //       .processSync(activity.description || "");
  //     const htmlContent = processedContent.toString();

  //     const res = String(htmlContent);
  //     console.log(res)
  //     setDescription(res);
  //   })();

  // }, [activity])

  return (
    <div
      className="container h-auto px-0 mx-auto my-10 w-100 bg-grey"
      key={activity.id}
    >
      <div className="flex flex-wrap mx-auto event-container md:flex-nowrap md:h-600 lg:gap-8">
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:order-1 order-2">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700 title-font">
            {activity.name}
          </h1>
          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{activity?.city}</p>
          </div>
          <h2 className="mt-2 mb-4 text-sm tracking-widest text-gray-400 title-font">
            {activity?.tags.map((tag) => (
              <span key={tag.id} className="mr-2">
                #{tag?.tag.name}
              </span>
            ))}
          </h2>

          <div className="flex items-center pb-5 mt-6 mb-0 text-md">
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

          {/* <p
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: activity.description }}
          ></p> */}
          <Markdown>{activity.description}</Markdown>
          {/* <ReactMarkdown children={activity.description ?? ''} /> */}
        </div>
        <div className=" lg:w-1/2 lg:order-2 order-1">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full rounded"
            src={activity.cover || ''}
          />
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
    </div>
  );
};

export default EventPage;
