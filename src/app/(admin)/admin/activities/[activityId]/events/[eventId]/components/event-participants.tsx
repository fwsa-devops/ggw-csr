import UserAvatar from '@/components/user-avatar';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import EventParticipantsUpdate from './update-event-participants';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';

const EventParticipants = ({
  activityId,
  eventId,
  volunteers,
}: {
  activityId: string;
  eventId: string;
  volunteers: any[];
}) => {
  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <h2 className="text-base font-semibold">
            Participants
            <span> ({volunteers.length}) </span>
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'default'} size={'sm'} className="text-xs">
                <EditIcon size={14} className="mr-3" /> Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Participants list</DialogTitle>
                <DialogDescription>
                  You can add or deleted participants
                </DialogDescription>
                <EventParticipantsUpdate
                  volunteers={volunteers}
                  activityId={activityId}
                  eventId={eventId}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <ul role="list" className="divide-y divide-gray-100">
            {volunteers.map((_volunteer) => (
              <li
                key={_volunteer.email}
                className="flex items-center justify-between gap-x-6 py-2"
              >
                <div className="flex min-w-0 gap-x-4">
                  <UserAvatar user={_volunteer} />
                  {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {_volunteer.name}
                    </p>
                    <p className="truncate text-xs leading-5 text-gray-500">
                      {_volunteer.email}
                    </p>
                  </div>
                </div>
                {/* <Button
                  variant={'outline'}
                >
                  <XIcon size={18} className='' />
                </Button> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventParticipants;
