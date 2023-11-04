'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import UserAvatar from '@/components/user-avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useFetch } from 'usehooks-ts';
import * as z from 'zod';
import ParticipantComboBox from './event-participant-combobox';
import { addParticipant, removeParticipant } from '@/components/actions/action';

import { useRouter } from 'next/navigation';

const addEventVolunteerForm = z.object({
  activityId: z.string(),
  id: z.string().optional(),
  volunteers: z.array(z.string()).optional(),
});

const EventParticipants = ({
  activityId,
  eventId,
  volunteers,
}: {
  activityId: string;
  eventId: string;
  volunteers: any[];
}) => {
  const router = useRouter();

  console.log(volunteers);

  const form = useForm<z.infer<typeof addEventVolunteerForm>>({
    resolver: zodResolver(addEventVolunteerForm),
    defaultValues: {
      id: eventId,
      activityId: activityId,
      volunteers: volunteers,
    },
  });

  const { data: users, error } = useFetch<User[]>('/api/users', {
    method: 'GET',
  });

  if (!users) {
    return <></>;
  }

  form.register('volunteers', {
    onChange: async (event) => {
      console.log('volunteers', event);
      const { value } = event.target;
      const userId = typeof value === 'string' ? value : value[0].id;

      const isPartofEvent = volunteers?.findIndex((_vol) => _vol.id === userId);
      console.log('isPartofEvent', isPartofEvent);

      const toast = {};

      if (isPartofEvent > -1) {
        const userEmail = volunteers[isPartofEvent].email;
        const res = await removeParticipant(eventId, userEmail);
        Object.assign(toast, res);
      } else {
        const userEmail = users.find((_user) => _user.id === userId);
        if (!userEmail) {
          return;
        }
        const res = await addParticipant(eventId, userEmail?.email);
        Object.assign(toast, res);
      }

      form.setValue('volunteers', []);
      router.refresh();
    },
  });

  return (
    <>
      <div>
        <h2 className="text-base font-semibold mb-2">
          Participants
          <span> ({volunteers.length}) </span>
        </h2>

        <div className="mb-2">
          <Form {...form}>
            <form>
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
                            multiple={false}
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
            </form>
          </Form>
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
