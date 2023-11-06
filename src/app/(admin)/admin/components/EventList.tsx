'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import EventListItem from './EventIListItem';
import { useBoolean } from 'usehooks-ts';
import { isUserPartOfActivity } from '@/components/utils';
import { useEffect } from 'react';
import { IEvent } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EventList = ({
  activityId,
  events,
  size = 'lg',
}: {
  activityId: string;
  events: IEvent[];
  size: 'lg' | 'sm';
}) => {
  const { status } = useSession();
  const router = useRouter();

  const { setValue, value: isMember } = useBoolean(false);

  const checkUserAlreadyRegistered = async () => {
    // console.log('checkUserAlreadyRegistered', isMember);
    const result = await isUserPartOfActivity();
    // console.log(result);
    setValue(Boolean(result));
  };

  useEffect(() => {
    checkUserAlreadyRegistered();
    // think this will call infinitely since isMember is changed when isMember is changed
  }, [events, isMember]);

  return (
    <>
      <div className="mt-12">
        <div className="flex flex-row justify-between">
          <h2 className="pb-2 pl-1 mb-2 text-2xl font-semibold text-gray-700">
            Events
          </h2>

          {status === 'authenticated' && (
            <Link href={`/admin/activities/${activityId}/events/new`}>
              <Button variant={'default'}>
                <PlusIcon size={18} className="mr-2" />
                Add
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div>
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventListItem
              activityId={activityId}
              key={event.id}
              event={event}
              size={size}
              isMember={isMember}
              onJoin={() => router.refresh()}
            />
          ))
        ) : (
          <p>
            As of now, we have not scheduled any events. We appreciate your
            interest and will keep you updated as soon as we have something
            planned
          </p>
        )}
      </div>
    </>
  );
};

export default EventList;
