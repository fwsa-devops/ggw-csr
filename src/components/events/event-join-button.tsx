'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { HandIcon, XIcon } from 'lucide-react';
import { deleteEvent, joinEvent } from './utils/api';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import ListUsers from '../event/list-users';
import { Separator } from '@/components/ui/separator';

const EventJoinButton = ({ event, extended }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [eventUsers, setEventUsers] = useState(event.users);

  const hasJoined = eventUsers.find(
    (user) => user.userId === session?.user?.email,
  );

  const toggleJoin = async () => {
    setIsLoading(true);
    if (hasJoined) {
      const deletedEventUser = await deleteEvent(event.id);
      if (deletedEventUser.count === 1)
        setEventUsers(
          eventUsers.filter((user) => user.userId !== session?.user?.email),
        );
    } else {
      const updatedEventUser = await joinEvent(event.id);
      setEventUsers([...eventUsers, updatedEventUser]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {extended && <Separator className="mt-6 mb-4" />}
      <div
        className={`flex justify-between my-4 event-details ${
          extended ? 'mt-8' : ''
        }`}
      >
        <div className={extended ? 'w-[70%]' : 'w-[100%]'}>
          <Progress value={eventUsers?.length} max={event?.count / 4} />
          <p className="mt-2 text-sm text-gray-700">
            {`${eventUsers?.length} / ${event?.count}`} Joined
          </p>
          {extended && eventUsers && eventUsers.length ? (
            <div className="">
              <ListUsers
                stacked={false}
                users={eventUsers}
                title="Volunteers"
              />
            </div>
          ) : null}
        </div>
        {extended && (
          <div className="w-[30%] flex justify-end">
            <Button
              size="sm"
              disabled={isLoading}
              onClick={() => (!session ? signIn('google') : toggleJoin())}
            >
              {!!hasJoined ? <XIcon size="18" /> : <HandIcon size="18" />}
              <span className="pl-2">
                {!!hasJoined ? 'Unjoin' : 'Join'}
                {extended ? ' this event' : ''}
              </span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventJoinButton;
