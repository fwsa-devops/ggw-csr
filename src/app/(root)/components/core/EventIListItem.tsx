'use client';

import { Separator } from '@/components/ui/separator';
import {
  BuildingIcon,
  CalendarRangeIcon,
  HandIcon,
  MapIcon,
  XIcon,
} from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '../../../../components/ui/button';
// import { deleteEvent, joinEvent } from '../events/utils/api';
import { joinEvent, unJoinEvent } from '@/components/actions/action';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { IEvent } from '@/types';
import { useTransition } from 'react';
import { Progress } from '../../../../components/ui/progress';
import { toast } from '../../../../components/ui/use-toast';
import { ActivityState } from '@prisma/client';
import Link from 'next/link';

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
  isPartOfAnyEvent,
  isPartOfThisEvent,
  activity,
}: {
  event: IEvent;
  size: 'lg' | 'sm';
  isPartOfAnyEvent: boolean;
  isPartOfThisEvent: boolean;
  activity: any;
}) => {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  const { is_dates_announced, date_announcement_text, startTime, endTime } =
    event;
  const date = !is_dates_announced
    ? date_announcement_text + ' Hrs'
    : calculateTimeDiff(startTime, endTime);

  const isEventLimitReached: boolean =
    event?.max_volunteers === event.leaders.length;

  const callServerAction = async (action: 'JOIN' | 'UNJOIN') => {
    const toastObj = {
      title: '',
      varient: 'default',
    };

    try {
      if (action === 'JOIN') {
        const res = await joinEvent(event.id);
        if (!res.success) throw res.message;

        toastObj.title = res.message;
      } else {
        const res = await unJoinEvent(event.id);
        if (!res.success) throw res.message;

        toastObj.title = res.message;
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
      <div id={event.id}
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
                <>
                  <div className="basis-full">Description</div>
                  <p>{event.description}</p>
                </>
              )}
            </div>

            {size === 'lg' && (
              <div className="flex flex-col md:ml-auto md:items-end">
                <h2 className="font-semibold mb-2">Event Leaders</h2>
                <div className="flex">
                  {event.leaders.map(({ user }) => (
                    <UserAvatar key={user.id} user={user} />
                  ))}
                </div>
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

            {size === 'lg' &&
              (activity.status !== ActivityState.CLOSED ? (
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
                  ) : !isPartOfAnyEvent ? (
                    <Button
                      variant={'default'}
                      className="ml-4"
                      type="button"
                      disabled={isPending || isEventLimitReached}
                      onClick={() =>
                        startTransition(() => callServerAction('JOIN'))
                      }
                    >
                      <HandIcon size={18} className="mr-2" />
                      Join this event
                    </Button>
                  ) : (
                    isPartOfThisEvent && (
                      <Button
                        variant={'default'}
                        className="ml-4"
                        type="button"
                        disabled={isPending || isEventLimitReached}
                        onClick={() =>
                          startTransition(() => callServerAction('UNJOIN'))
                        }
                      >
                        <XIcon size={18} className="mr-2" />
                        Unjoin this event
                      </Button>
                    )
                  )}
                </div>
              ) : (
                <div>
                  <Link href={`/activities/${activity.id}/${event.id}`}>
                    <Button variant={'default'} className="ml-4" type="button">
                      Write feedback
                    </Button>
                  </Link>
                </div>
              ))}
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
