import { CalendarIcon } from 'lucide-react';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import moment from 'moment';

const NotificationsDrawer = ({ activitiesJoined }) => {
  return (
    <div className="z-10">
      <Popover>
        <PopoverTrigger asChild>
          <div className="mr-3 hover:bg-gray-200 rounded-full bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer relative">
            {/* <BellIcon className="bg-grey-700" size={18} /> */}
            <CalendarIcon className="bg-grey-700" size={24} />
            {activitiesJoined.length > 0 && (
              <span className="absolute bottom-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {activitiesJoined.length}
              </span>
            )}
            <span className="sr-only">View notifications</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="sm:w-96 min-h-min h-96 overflow-y-auto w-screen mx-auto"
          align="end"
          alignOffset={0}
        >
          <div className="space-y-2">
            <h4 className="font-semibold leading-none">Notifications</h4>
            <div className="text-sm text-muted-foreground">
              <ul role="list" className="divide-y divide-gray-100">
                {activitiesJoined.length > 0 ? (
                  activitiesJoined?.map((activity) => (
                    <div key={activity.event.id}>
                      <li className="flex justify-between gap-x-6 py-5">
                        <Link
                          href={`/activities/${activity.event.activity.id}#${activity.event.id}`}
                        >
                          You joined an Activity
                          <span className="mx-2 text-sm font-semibold leading-6 text-gray-900 underline">
                            {activity.event.activity.name}
                            {/* <LinkIcon size={12} className='inline ml-2' /> */}
                          </span>
                          Scheduled to happen
                          <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">
                            {activity.event.is_dates_announced
                              ? moment(activity.event.startTime).fromNow()
                              : activity.event.date_announcement_text}
                          </span>
                        </Link>
                      </li>
                      <Separator />
                    </div>
                  ))
                ) : (
                  <span>No activities joined yet</span>
                )}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationsDrawer;
