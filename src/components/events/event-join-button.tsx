'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { HandIcon, XIcon } from 'lucide-react';
import { deleteEvent, joinEvent } from './utils/api';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import ListUsers from '../event/list-users';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { EventLeader, Volunteers, Event, User } from '@prisma/client';

interface IEvent extends Event {
  volunteers: ({ user: User } & Volunteers)[];
  leaders: EventLeader[];
}

const EventJoinButton = ({
  event,
  extended = false,
  alreadyJoinedActivity = false,
  onJoin,
}: {
  event: IEvent;
  extended?: boolean;
  alreadyJoinedActivity?: boolean;
  onJoin?: () => void;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [eventUsers, setEventUsers] = useState(event.volunteers);

  const hasJoined = eventUsers.find(
    (user) => user.user_id === session?.user?.email,
  );

  const toggleJoin = async () => {
    setIsLoading(true);
    if (hasJoined) {
      const deletedEventUser = await deleteEvent(event.id);
      if (deletedEventUser.count === 1) {
        setEventUsers(
          eventUsers.filter((user) => user.user_id !== session?.user?.email),
        );
        toast({
          title: 'Successfully Unjoined event',
          // description: event ,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Unjoining event',
          // description: event.name,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
      }
    } else {
      try {
        const updatedEventUser = await joinEvent(event.id);
        setEventUsers([...eventUsers, updatedEventUser]);
        toast({
          title: 'Successfully Joined event',
        });
      } catch (error) {
        console.error('exception', error);
        toast({
          variant: 'destructive',
          title: 'Error Joining event',
          description: 'Only Freshworks emails are allowed to join',
        });
      }
    }
    onJoin?.();
    setIsLoading(false);
  };

  return (
    <>
      {extended && <Separator className="mt-6 mb-4" />}
      <div
        className={`flex justify-between my-4 event-details flex-wrap md:flex-nowrap ${
          extended ? 'mt-8' : ''
        }`}
      >
        <div className={extended ? 'md:w-[70%] w-full ' : 'md:w-[100%] w-full'}>
          <Progress value={eventUsers?.length} max={event?.max_volunteers} />
          <p className="mt-2 text-sm text-gray-700">
            {`${eventUsers?.length} / ${event?.max_volunteers}`} Joined
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
          <div className="md:w-[20%] w-full flex md:justify-end md:mt-0 mt-6">
            <Button
              size="sm"
              disabled={isLoading || (alreadyJoinedActivity && !hasJoined)}
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
