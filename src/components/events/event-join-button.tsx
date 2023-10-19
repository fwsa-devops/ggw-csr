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

const EventJoinButton = ({
  event,
  extended = false,
  alreadyJoinedActivity = false,
  onJoin,
}: {
  event: any;
  extended?: boolean;
  alreadyJoinedActivity?: boolean;
  onJoin?: () => void;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [eventUsers, setEventUsers] = useState(event.users);

  const hasJoined = eventUsers.find(
    (user) => user.userId === session?.user?.email,
  );

  const toggleJoin = async () => {
    setIsLoading(true);
    if (hasJoined) {
      const deletedEventUser = await deleteEvent(event.id);
      if (deletedEventUser.count === 1) {
        setEventUsers(
          eventUsers.filter((user) => user.userId !== session?.user?.email),
        );
        toast({
          title: 'Successfully Unjoined event',
          description: event.name,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Unjoining event',
          description: event.name,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
      }
    } else {
      const updatedEventUser = await joinEvent(event.id);
      setEventUsers([...eventUsers, updatedEventUser]);
      toast({
        title: 'Successfully Joined event',
        description: event.name,
      });
    }
    onJoin?.();
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
