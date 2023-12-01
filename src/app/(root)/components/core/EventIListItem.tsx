/* eslint-disable no-irregular-whitespace */
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
import { Button } from '@/components/ui/button';
// import { deleteEvent, joinEvent } from '../events/utils/api';
import { joinEvent, unJoinEvent } from '@/components/actions/action';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { IEvent } from '@/types';
import { useTransition } from 'react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { ActivityState } from '@prisma/client';
import Link from 'next/link';
import moment from 'moment-timezone';
import { EVENT_LOCATIONS } from '../../../../../constants';

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
  participatedEvents = null,
}: {
  event: IEvent;
  size: 'lg' | 'sm';
  isPartOfAnyEvent: boolean;
  isPartOfThisEvent: boolean;
  activity: any;
  participatedEvents: any;
}) => {
  const { toast } = useToast();

  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  // console.log('EventListItem', event);

  const {
    is_dates_announced,
    date_announcement_text,
    startTime,
    endTime,
    timeZone,
  } = event;

  // console.log('timeZone', timeZone);

  const date = !is_dates_announced
    ? date_announcement_text + ' Hrs'
    : calculateTimeDiff(startTime, endTime);

  const isEventLimitReached: boolean =
    event?.max_volunteers === event.volunteers.length;

  const callServerAction = async (action: 'JOIN' | 'UNJOIN') => {
    const toastObj: any = {
      title: '',
      varient: 'default',
    };

    try {
      if (action === 'JOIN') {
        const res = await joinEvent(event.id);

        if (!res.success) throw res.message;

        toastObj['description'] =
          'Event info will be shared via Email closer to the event date';
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
      <div
        className={cn('my-5 relative', size === 'lg' ? 'mt-12' : '')}
        id={event.id}
      >
        {size === 'lg' && (
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-base rounded py-1 px-2 pb-3 -mt-8 -z-10">
            {' '}
            {/* Add the badge */}
            {EVENT_LOCATIONS.find((loc) => loc.value === event.city)?.name}
          </div>
        )}

        <div
          className={cn(
            'text-sm text-gray-700 event-timings align-center z-10',
            size === 'lg'
              ? 'p-6 py-4 border border-b-2 shadow rounded-xl bg-card text-card-foreground join-event'
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
                <div className="flex mr-4 mb-2">
                  <MapIcon size={18} className="mr-2" />
                  {
                    EVENT_LOCATIONS.find((loc) => loc.value === event.city)
                      ?.name
                  }
                </div>

                {size === 'lg' && (
                  <div className="flex mr-4  mb-2">
                    <BuildingIcon size={18} className="mr-2" />
                    {event.location}
                  </div>
                )}

                <div className="flex mr-4 mb-2">
                  <CalendarRangeIcon size="18" className="mr-2" />

                  {is_dates_announced
                    ? moment(startTime)
                        .tz('Asia/Kolkata')
                        .format('MMM Do, h:mm A') +
                      ' ' +
                      timeZone +
                      ' - ' +
                      moment(endTime)
                        .tz('Asia/Kolkata')
                        .format('MMM Do, h:mm A') +
                      ' ' +
                      timeZone
                    : date_announcement_text}
                </div>

                {event.description && size === 'lg' && (
                  <>
                    <div className="basis-full text-base font-semibold mt-2 mb-1">
                      Description
                    </div>
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
              <div className={cn('flex-1', size === 'lg' ? 'mb-2' : '')}>
                <Progress
                  value={(event.volunteers.length / event.max_volunteers) * 100}
                  className="my-2"
                />
                <div>
                  {`${event.volunteers.length} / ${event?.max_volunteers}`}{' '}
                  Joined
                  {size === 'lg' && (
                    <span className="ml-2 text-gray-400">
                      (Minimum {event.min_volunteers} Volunteers)
                    </span>
                  )}
                </div>
              </div>

              {size === 'lg' &&
                (event.status !== ActivityState.CLOSED ? (
                  <div className="">
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
                          disabled={isPending}
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
                      <Button
                        variant={'default'}
                        className="ml-4"
                        type="button"
                      >
                        Write feedback
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>

            {event.status !== ActivityState.CLOSED &&
              ((size === 'lg' && isEventLimitReached && (
                <div className="text-red-500 font-medium ">
                  Maximum number of volunteers limit reached. Check out some of
                  our other events.
                </div>
              )) ||
                (status === 'authenticated' &&
                  isPartOfAnyEvent &&
                  !isPartOfThisEvent && (
                    <div className="text-red-500 font-medium">
                      You are already part of{' '}
                      <Link
                        href={`/activities/${participatedEvents?.activity.id}#${participatedEvents?.id}`}
                        className="underline"
                      >
                        {participatedEvents
                          ? participatedEvents?.activity.name
                          : 'another '}
                      </Link>{' '}
                      Event, Please unjoin to join this one
                    </div>
                  )))}

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

            {size === 'lg' && event.status === ActivityState.CLOSED && (
              <div className="mt-8 text-red-500 font-medium">
                {`Registrations are closed. If you have registered, you will receive an email with the event details by Friday (1 Nov, 2023)`}
              </div>
            )}
          </div>
        </div>
      </div>

      {size === 'sm' && <Separator />}
    </>
  );
};

export default EventListItem;
