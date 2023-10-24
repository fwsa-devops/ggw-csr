import {
  BuildingIcon,
  CalendarRangeIcon,
  HandIcon,
  LocateIcon,
  MapIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Event, EventLeader, User, Volunteers } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useBoolean } from 'usehooks-ts';
import { deleteEvent, joinEvent } from '../events/utils/api';
import { toast } from '../ui/use-toast';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import UserAvatar from '../event/user-avatar';
import { IEvent } from '@/types';

const calculateTimeDiff = (start, end) => {
  return (
    ((new Date(end as any).getTime() as any) -
      (new Date(start as any).getTime() as any)) /
    (1000 * 60 * 60)
  );
};

const EventListItem = ({
  event,
  size = 'lg',
  isMember,
  onJoin,
}: {
  event: IEvent;
  size: 'lg' | 'sm';
  isMember: boolean;
  onJoin?: () => void;
}) => {
  const { status, data } = useSession();

  const { value: isLoading, setTrue, setFalse, toggle } = useBoolean(false);

  const { is_dates_announced, date_announcement_text, startTime, endTime } =
    event;
  const date = !is_dates_announced
    ? date_announcement_text
    : calculateTimeDiff(startTime, endTime);

  const toggleJoin = async () => {
    setTrue();

    const toastObj = {
      varient: 'default',
      title: '',
      description: '',
    };

    try {
      if (isMember) {
        toastObj.title = 'Unjoin Event';
        await deleteEvent(event.id);
        toastObj.description = 'Successfully Unjoined event';
      } else {
        toastObj.title = 'Join Event';
        await joinEvent(event.id);
        toastObj.description = 'Successfully Joined event';
      }
    } catch (error: any) {
      console.log(error);
      toastObj.varient = 'destructive';
      // toastObj.title = 'Error Joining event'
      toastObj.description = error.message;
    }

    onJoin?.();
    toast(toastObj);
    setFalse();
  };

  return (
    <>
      <div
        className={cn(
          'my-5 px-2 text-sm text-gray-700 event-timings align-center',
          size === 'lg'
            ? 'p-6 py-4 mt-6 border border-b-2 shadow rounded-xl bg-card text-card-foreground join-event'
            : '',
        )}
      >
        <div className="text-sm text-gray-700 event-duration gap-x-1">
          <div
            className={cn(
              'flex flex-row  flex-wrap ',
              size === 'lg' ? 'lg:flex-nowrap items-center' : '',
            )}
          >
            <div className="flex mr-4  mb-2">
              <MapIcon size={18} className="mr-2" />
              {event.city}
            </div>

            {size === 'lg' && (
              <div className="flex mr-4  mb-2">
                <BuildingIcon size={18} className="mr-2" />
                {event.location}
              </div>
            )}

            <div className="flex mr-4 mb-2">
              <CalendarRangeIcon size="18" className="mr-2" />
              {is_dates_announced ? date + ' Hrs' : date_announcement_text}
            </div>

            {size === 'lg' && (
              <div className="ml-auto flex flex-col items-end">
                <h2 className="font-semibold mb-2">Event Leaders</h2>
                {event.leaders.map(({ user }) => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>

          {size === 'lg' && <Separator className="mt-6 mb-4" />}

          <div className="flex justify-between items-start">
            <div className={cn('flex-1', size === 'lg' ? 'mb-2' : '')}>
              <Progress
                value={event.volunteers.length}
                max={event.max_volunteers}
                className="my-2"
              />
              <span>
                {`${event.volunteers.length} / ${event?.max_volunteers}`} Joined
              </span>
            </div>

            {size === 'lg' && (
              <div>
                {!isMember ? (
                  <Button
                    variant={'default'}
                    className="ml-4"
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      status === 'unauthenticated'
                        ? signIn('google')
                        : toggleJoin()
                    }
                  >
                    <HandIcon size={18} className="mr-2" />
                    Join this event
                  </Button>
                ) : (
                  <Button
                    variant={'default'}
                    className="ml-4"
                    type="button"
                    disabled={isLoading}
                    onClick={() => toggleJoin()}
                  >
                    <XIcon size={18} className="mr-2" />
                    Unjoin this event
                  </Button>
                )}
              </div>
            )}
          </div>

          {size === 'lg' && (
            <div className="mt-3 flex items-center">
              <div className="font-semibold mr-6 text-base">Volunteers</div>
              <div className="flex flex-row flex-wrap">
                {event.volunteers.map(({ user }) => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {size === 'sm' && <Separator />}
    </>
  );
};

export default EventListItem;
