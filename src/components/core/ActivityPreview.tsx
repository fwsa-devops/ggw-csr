import { LaptopIcon, PenIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { IActivity } from '@/types';

const ActivityPreview = ({ activity }: { activity: IActivity }) => {
  return (
    <>
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

            <Link href={`/admin/activities/${activity.id}/edit`}>
              <Button variant={'default'}>
                <PenIcon size={18} className="mr-3" />
                Edit
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 mb-2 location align-center">
            <LaptopIcon />
            <p>{activity?.city}</p>
          </div>
          <h2 className="mt-2 mb-3 text-sm tracking-widest text-gray-400 title-font">
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
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: activity.description ?? '' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ActivityPreview;
