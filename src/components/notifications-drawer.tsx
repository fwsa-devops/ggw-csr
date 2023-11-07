import { CalendarCheck2 } from 'lucide-react';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"

const NotificationsDrawer = ({ activitiesJoined }) => {


  return (
    <div className="z-10">
      <Popover>
        <PopoverTrigger asChild>
          <div className="mr-3 hover:bg-gray-200 rounded-full bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
            <CalendarCheck2 className="bg-grey-700" size={18} />
            <span className="sr-only">View notifications</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-80"
          style={{ height: '500px', overflowY: 'scroll' }}
        >
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Activities joined</h4>
            <div className="text-sm text-muted-foreground">
              <ul role="list" className="divide-y divide-gray-100">
                {activitiesJoined?.map((activity) => (
                  <>
                    <li key={activity.event.id} className="flex justify-between gap-x-6 py-5">
                      <Link href={`/activities/${activity.event.activity.id}#${activity.event.id}`}>
                        {' '}
                        <p className="text-sm font-semibold leading-6 text-gray-900">{activity.event.activity.name}</p>
                      </Link>
                      {/* <p className="">{activity.event.activity.description}</p> */}
                    </li>
                    <Separator />
                  </>
                ))}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div >
  );
};

export default NotificationsDrawer;
