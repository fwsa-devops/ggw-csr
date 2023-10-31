'use client';

import { LaptopIcon } from 'lucide-react';
import EventFeedbackForm from './event-feedback-form';
import { Separator } from '@/components/ui/separator';
import EventFeedbackList from './event-feedback-list';

const EventDetails = ({ event }: { event: any }) => {
  console.log(event);

  return (
    <>
      <div className="order-1 lg:order-0 lg:w-full">
        <img
          alt="ecommerce"
          className=" lg:aspect-video lg:max-h-[420px]  object-cover object-center w-full rounded"
          src={event.activity.cover || ''}
        />
      </div>

      <div className="flex flex-col md:flex-row md:flex-nowrap lg:gap-8 lg:order-2 order-2">
        <div className="mt-12 lg:mt-6 lg:mx-auto order-1 lg:order-1 lg:w-full ">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center items-end">
            <h1 className="md:mb-4 text-2xl font-semibold text-gray-700 title-font">
              {event.activity.name}
            </h1>
          </div>

          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{event.activity?.city}</p>
          </div>
          <h2 className="mt-2 mb-3 text-sm tracking-widest text-gray-400 title-font">
            {event.activity.tags
              ? event.activity?.tags.map((tag) => (
                <span key={tag.id} className="mr-2">
                  #{tag?.tag.name}
                </span>
              ))
              : ''}
          </h2>

          <div className="flex items-center pb-5 mt-3 mb-0 text-md">
            <div className="flex flex-col gap-y-2">
              <div className="flex">
                <div className="mr-3 font-semibold">Duration: </div>
                {event.activity.duration} minutes
              </div>
            </div>
          </div>

          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: event.activity.description ?? '',
            }}
          ></div>
        </div>
      </div>

      <Separator className="my-10 sm:hidden md:block" />

      <div className=" w-full my-10 order-2 lg:order-2 mt-12 lg:mt-6 lg:mx-auto">
        <EventFeedbackForm eventId={event.id} activityId={event.activityId} />
      </div>

      <div className="my-10">
        <EventFeedbackList feedbacks={event.feedback} />
      </div>
    </>
  );
};

export default EventDetails;
