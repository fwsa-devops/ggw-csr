import { CalendarCheck2 } from 'lucide-react';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';

const NotificationsDrawer = ({ activitiesJoined }) => {
  return (
    <div className="z-10 h-2/4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="p-3 mx-3 hover:bg-gray-200 rounded-full bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
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
              {activitiesJoined.map((activity) => (
                <>
                  <Link href={`/activity/${activity.id}`}>
                    {' '}
                    <p className="text-bold">{activity.name}</p>
                  </Link>
                  <p className="">{activity.description}</p>
                </>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationsDrawer;
