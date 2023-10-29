import React from 'react';
import { getActivityDescription } from '@/components/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PastActivities = (props) => {
  const { pastActivities } = props;

  const getParticipantsCount = (activity): number => {
    const totalUsersInActivity = activity.events.reduce((total, event) => {
      const usersInEvent = event.volunteers.length;
      return total + usersInEvent;
    }, 0);
    return totalUsersInActivity;
  };

  return (
    <>
      <h2 className="text-2xl mt-20 text-center">Past Activities</h2>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap m-2">
            {pastActivities.length > 0 ? (
              pastActivities?.map((activity) => (
                <div className="p-4 md:w-1/3">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={activity.cover || ''}
                      alt="blog"
                    />
                    <div className="p-6 flex flex-col">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {activity.name}
                      </h1>
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {activity?.tags.length > 0
                          ? activity?.tags
                              .map((tag) => `#${tag?.tag.name}`)
                              .join(', ')
                          : 'No tags available'}
                      </h2>

                      <p className="leading-relaxed mb-3">
                        {getActivityDescription(activity)}
                      </p>
                      <div className="flex items-center flex-wrap ">
                        <Link href={`/activities/${activity.id}`}>
                          <Button size="sm" variant="outline">
                            Learn more
                          </Button>
                        </Link>
                        <span className="text-gray-400 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          {getParticipantsCount(activity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="container flex justify-center h-auto mx-auto my-10 text-xl">
                No Past Activities available
              </h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PastActivities;
