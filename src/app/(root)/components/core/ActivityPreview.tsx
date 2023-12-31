import { IActivity } from '@/types';
import { getServerSession } from 'next-auth';

const ActivityPreview = async ({ activity }: { activity: IActivity }) => {
  const session = await getServerSession();

  return (
    <>
      <div className="flex flex-wrap flex-col mx-auto event-container md:flex-nowrap md:h-600 lg:gap-8">
        <div className="order-1 lg:order-1 lg:w-full">
          <img
            alt="ecommerce"
            className=" lg:aspect-video lg:max-h-[500px] object-cover object-center w-full rounded"
            src={activity.cover || ''}
          />
        </div>

        <div className="w-full mt-12 lg:mt-6 lg:mx-auto lg:order-2 order-2">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center items-end">
            <h1 className="md:mb-4 text-2xl font-semibold text-gray-700 title-font">
              {activity.name}
            </h1>
          </div>

          {/* <div className="flex gap-2 mb-2 location align-center">
            <MapPin size="18" />
            <p>{activity?.city}</p>
          </div> */}

          <h2 className="mb-3 text-sm tracking-widest text-gray-400 title-font">
            {activity.tags
              ? activity?.tags.map((tag) => (
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
                {activity.duration} minutes
              </div>
            </div>
          </div>

          <div
            className="leading-relaxed activity-description"
            dangerouslySetInnerHTML={{ __html: activity.description ?? '' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ActivityPreview;
