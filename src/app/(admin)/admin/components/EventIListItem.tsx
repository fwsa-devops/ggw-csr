import { BuildingIcon, CalendarRangeIcon, MapIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import { IEvent } from '@/types';
import { useTransition } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { EVENT_LOCATIONS } from '../../../../../constants';

const calculateTimeDiff = (start, end) => {
  return (
    ((new Date(end as any).getTime() as any) -
      (new Date(start as any).getTime() as any)) /
    (1000 * 60 * 60)
  );
};

const EventListItem = ({
  activityId,
  event,
  size = 'lg',
  isMember,
  onJoin,
}: {
  activityId: string;
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
                    ? moment(startTime).format('MMM Do, h:mm A') +
                      ' - ' +
                      moment(endTime).format('h:mm A')
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
                <div className="ml-auto flex flex-col items-end">
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
                  {`${event.volunteers.length} / ${event?.max_volunteers}`}{' '}
                  Joined
                  {size === 'lg' && (
                    <span className="ml-2 text-gray-400">
                      ( Minimum {event.min_volunteers} Volunteers )
                    </span>
                  )}
                </div>
              </div>

              {size === 'lg' && (
                <div>
                  <Link
                    href={`/admin/activities/${activityId}/events/${event.id}`}
                  >
                    <Button variant={'default'} className="ml-4" type="button">
                      {/* <PenIcon size={18} className="mr-2" /> */}
                      View
                    </Button>
                  </Link>
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
      </div>
      {size === 'sm' && <Separator />}
    </>
  );
};

export default EventListItem;
