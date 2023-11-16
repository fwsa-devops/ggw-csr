'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useFetch } from 'usehooks-ts';
import * as z from 'zod';
import ParticipantComboBox from './event-participant-combobox';
import { updateParticipant } from '@/components/actions/action';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const addEventVolunteerForm = z.object({
  activityId: z.string(),
  id: z.string().optional(),
  volunteers: z.array(z.string()).optional(),
});

const EventParticipantsUpdate = ({
  activityId,
  eventId,
  volunteers: volunteerList = [],
}: {
  activityId: string;
  eventId: string;
  volunteers: User[];
}) => {
  const [volunteers, setVolunteer] = useState<any[]>(
    volunteerList.map((_vol) => ({
      ..._vol,
      isParticipant: true,
      isAdded: false,
      isRemoved: false,
    })),
  );
  const [addedVolunteers, setAddedVolunteers] = useState<any[]>([]);
  const [removedVolunteers, setRemovedVolunteers] = useState<any[]>([]);
  const [unChangedVolunteers, setUnChangedVolunteers] =
    useState<any[]>(volunteers);

  const router = useRouter();

  const form = useForm<z.infer<typeof addEventVolunteerForm>>({
    resolver: zodResolver(addEventVolunteerForm),
    defaultValues: {
      id: eventId,
      activityId: activityId,
      volunteers: volunteers.map((_v) => _v.id),
    },
  });

  const { data: users, error } = useFetch<User[]>('/api/users', {
    method: 'GET',
  });

  if (!users) {
    return <></>;
  }

  const volunteerOnChange = async (event) => {
    // console.log('event', event);
    // console.log('form.value', form.getValues('volunteers'));
    // console.log('volunteers', volunteers);
    // console.log('users', users);

    const selectedUsers = form.getValues('volunteers') ?? [];

    const _a = selectedUsers.filter(
      (user) => !volunteerList.map((_v) => _v.id).includes(user),
    );
    const added = _a.map((id) => users.find((_u) => _u.id === id));

    const unchanged = volunteerList.filter((user) =>
      selectedUsers.includes(user.id),
    );
    const removedUsers = volunteerList.filter(
      (user) => !selectedUsers.includes(user.id),
    );

    // console.log('compareSelectedUsers', {
    //   added: added,
    //   removed: removedUsers,
    //   unchanged: unchanged,
    // });

    setAddedVolunteers(added);
    setRemovedVolunteers(removedUsers);
    setUnChangedVolunteers(unchanged);
  };

  form.register('volunteers', { onChange: volunteerOnChange });

  const onSubmit = async () => {
    try {
      await updateParticipant(eventId, addedVolunteers, removedVolunteers);
      // router.push(`/admin/activities/${activityId}/events/${eventId}`);
      router.refresh();
    } catch (error) {
      // console.log(error);
    }
  };

  // const removeOnClick = async (participantId: string) => {
  //   await removeParticipant(eventId, participantId);
  // }

  return (
    <>
      <div className="mb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="volunteers"
              render={({ field }) => (
                <div className="mt-6">
                  <FormItem>
                    <FormControl className="mt-2">
                      {users && users.length > 0 && (
                        <ParticipantComboBox
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ref={field.ref}
                          items={users}
                          multiple={true}
                          onChange={field.onChange}
                          value={field.value ?? []}
                          key={'volunteers'}
                          placeholder="Search leaders..."
                          disabled={form.formState.isSubmitting}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className="w-full mt-6 flex justify-end">
              <Button
                disabled={form.formState.isSubmitting}
                className="ml-auto "
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="max-h-96 overflow-y-auto flex flex-wrap gap-2">
        {addedVolunteers.map((_volunteer) => (
          <Badge
            key={_volunteer?.id}
            className="cursor-pointer"
            // onClick={() => { removeOnClick(_volunteer.id) }}
            variant={'success'}
          >
            {_volunteer.name}
            {/* <XIcon size={12} className="ml-2" /> */}
          </Badge>
        ))}
        {unChangedVolunteers.map((_volunteer) => (
          <Badge
            key={_volunteer?.id}
            className="cursor-pointer"
            // onClick={() => { removeOnClick(_volunteer.id) }}
            variant={'outline'}
          >
            {_volunteer.name}
            {/* <XIcon size={12} className="ml-2" /> */}
          </Badge>
        ))}
        {removedVolunteers.map((_volunteer) => (
          <Badge
            key={_volunteer?.id}
            className="cursor-pointer"
            // onClick={() => { removeOnClick(_volunteer.id) }}
            variant={'destructive'}
          >
            {_volunteer.name}
            {/* <XIcon size={12} className="ml-2" /> */}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default EventParticipantsUpdate;
