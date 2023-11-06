import { LaptopIcon } from 'lucide-react';
import EventFeedbackForm from './event-feedback-form';
import { Separator } from '@/components/ui/separator';
import EventFeedbackList from './event-feedback-list';
import prisma from '@/lib/prisma';
import EventParticipants from './event-participants';
import ExportButton from './export-csv';

const EventDetails = async ({ event: eventDetails }: { event: any }) => {
  const volunteers = (
    await prisma.volunteers.findMany({
      where: {
        event_id: eventDetails.id,
      },
      include: {
        user: true,
      },
    })
  ).map((_vol) => _vol.user);

  console.log(volunteers);

  return (
    <>
      <div className="order-1 lg:order-0 lg:w-full">
        <img
          alt="ecommerce"
          className=" lg:aspect-video lg:max-h-[420px]  object-cover object-center w-full rounded"
          src={eventDetails.activity.cover || ''}
        />
      </div>

      <div className="flex flex-col md:flex-row md:flex-nowrap lg:gap-8">
        <div className="mt-12 lg:mt-6 lg:mx-auto order-0 lg:order-0 lg:w-full ">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center items-end">
            <h1 className="md:mb-4 text-2xl font-semibold text-gray-700 title-font">
              {eventDetails.activity.name}
            </h1>

            <ExportButton eventId={eventDetails.id} />
          </div>

          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{eventDetails.activity?.city}</p>
          </div>

          <h2 className="mt-2 mb-3 text-sm tracking-widest text-gray-400 title-font">
            {eventDetails.activity.tags
              ? eventDetails.activity?.tags.map((tag) => (
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
                {eventDetails.activity.duration} minutes
              </div>
            </div>
          </div>

          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: eventDetails.activity.description ?? '',
            }}
          ></div>
        </div>

        <div className="w-full  md:w-2/6 border-2 px-4 py-4 mt-2 lg:mt-6 rounded-md">
          <EventParticipants
            activityId={eventDetails.activityId}
            eventId={eventDetails.id}
            volunteers={volunteers}
          />
        </div>
      </div>

      <Separator className="my-10 sm:hidden md:block" />

      {/* TODO: switch to default */}
      {
        <>
          <div className=" w-full my-10 order-2 lg:order-2 mt-12 lg:mt-6 lg:mx-auto">
            <EventFeedbackForm
              eventId={eventDetails.id}
              activityId={eventDetails.activityId}
            />
          </div>
          <div className="my-10">
            <EventFeedbackList feedbacks={eventDetails.feedback} />
          </div>
        </>
      }
    </>
  );
};

export default EventDetails;
