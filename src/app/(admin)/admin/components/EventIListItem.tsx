import {
  BuildingIcon,
  CalendarRangeIcon,
  HandIcon,
  MapIcon,
  XIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';


import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import { IEvent } from '@/types';
import { joinEvent, unJoinEvent } from '@/components/actions/action';
import { useTransition } from 'react';

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
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  const { is_dates_announced, date_announcement_text, startTime, endTime } =
    event;
  const date = !is_dates_announced
    ? date_announcement_text + ' Hrs'
    : calculateTimeDiff(startTime, endTime);

  const callServerAction = async (action: 'JOIN' | 'UNJOIN') => {
    const toastObj = {
      title: '',
      varient: 'default',
    };

    try {
      if (action === 'JOIN') {
        const res = await joinEvent(event.id);
        if (!res.success) throw res.message;

        toastObj.title = res.data as string;
      } else {
        const res = await unJoinEvent(event.id);
        if (!res.success) throw res.message;

        toastObj.title = res.data as string;
      }
    } catch (error) {
      toastObj.title = error as string;
      toastObj.varient = 'destructive';
    } finally {
      toast(toastObj);
    }
  };

  return (
    <>
      <div
        className={cn(
          'my-5 text-sm text-gray-700 event-timings align-center',
          size === 'lg'
            ? 'p-6 py-4 mt-6 border border-b-2 shadow rounded-xl bg-card text-card-foreground join-event'
            : '',
        )}
      >
        <div className="text-sm text-gray-700 event-duration gap-x-1">
          <div
            className={cn(
              'flex flex-row  flex-wrap ',
              size === 'lg' ? 'lg:flex-nowrap items-top' : '',
              event.description ? ' items-top' : 'items-center',
            )}
          >
            <div
              className={cn(
                'flex-row flex-wrap',
                event.description ? 'flex ' : '',
                size === 'sm' ? 'flex' : '',
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
                {is_dates_announced ? date : date_announcement_text}
              </div>

              {event.description && size === 'lg' && (
                <div className="basis-full">Description</div>
              )}
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

          <div className="flex justify-between items-start font-medium">
            <div className={cn('flex-1 ', size === 'lg' ? 'mb-2' : '')}>
              <Progress
                value={(event.volunteers.length / event.max_volunteers) * 100}
                className="my-2"
              />
              <div>
                {`${event.volunteers.length} / ${event?.max_volunteers}`} Joined
                {size === 'lg' && (
                  <span className="ml-2 text-gray-400">
                    ( Minimum {event.min_volunteers} Volunteers )
                  </span>
                )}
              </div>
            </div>

            {size === 'lg' && (
              <div>
                {status === 'unauthenticated' ? (
                  <Button
                    variant={'default'}
                    className="ml-4"
                    type="button"
                    onClick={() => signIn('google')}
                  >
                    <HandIcon size={18} className="mr-2" />
                    Sign in to Join Event
                  </Button>
                ) : !isMember ? (
                  <Button
                    variant={'default'}
                    className="ml-4"
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => callServerAction('JOIN'))
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
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => callServerAction('UNJOIN'))
                    }
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
