'use client';

import { createActivityEvent } from '@/components/actions/action';
import { Button } from '@/components/ui/button';
import ComboBox from '@/components/ui/dropdown/combo-box';
import MultiSelect from '@/components/ui/dropdown/list-box';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { eventFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from 'usehooks-ts';
import * as z from 'zod';

const ActivityEventForm = ({ activityId, event }) => {
  
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (!session?.user) {
    return <>Un-Authorized User</>;
  }

  console.log("activityId", activityId)
  console.log("event", event)

  const { data: leaders, error } = useFetch<User[]>('/api/users', {
    method: 'GET',
  });

  // const formSchemaPartial = eventFormSchema.partial();

  const addRefines = (schema: typeof eventFormSchema) => {
    return schema
      .refine(
        (data) => {
          if (
            !data.is_dates_announced &&
            (data.date_announcement_text === '' ||
              data.date_announcement_text === undefined)
          ) {
            return false;
          }
          return true;
        },
        {
          message:
            'Announcement Details is required if actual dates are not announced',
          path: ['date_announcement_text'],
        },
      )
      .refine(
        (data) => {
          if (
            data.startTime &&
            data.endTime &&
            data.startTime >= data.endTime
          ) {
            return false;
          }
          return true;
        },
        {
          message: 'End time must be greater than Start time',
          path: ['startTime', 'endTime'],
        },
      )
      .refine(
        (data) => {
          if (
            data.min_volunteers &&
            data.max_volunteers &&
            data.min_volunteers > data.max_volunteers
          ) {
            return false;
          }
          return true;
        },
        {
          message:
            'Minimum Volunteers must be either same or less than Maximum Volunteers',
          path: ['min_volunteers'],
        },
      )
      .refine(
        (data) => {
          if (
            data.min_volunteers &&
            data.max_volunteers &&
            data.min_volunteers > data.max_volunteers
          ) {
            return false;
          }
          return true;
        },
        {
          message:
            'Maximum Volunteers must be either same or greater than Minimum Volunteers',
          path: ['max_volunteers'],
        },
      );
  };

  const refinedSchema = addRefines(eventFormSchema);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(refinedSchema),
    defaultValues: event
      ? {
        id: event.id,
        activityId: activityId as string,
        city: event.city ?? 'chennai',
        location: event.location ?? '',
        description: event.description ?? '',
        min_volunteers: event.min_volunteers ?? 1,
        max_volunteers: event.max_volunteers ?? 1,
        is_dates_announced: event.is_dates_announced ?? false,
        date_announcement_text: event.date_announcement_text ?? '',
        published: event.published ?? true,
        leaders: event.leaders
      }
      : {
        city: 'Chennai',
        location: '',
        description: '',
        min_volunteers: 1,
        max_volunteers: 1,
        activityId: activityId as string,
        is_dates_announced: false,
        date_announcement_text: '',
        published: true,
      },
  });

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      // console.log(values);
      const response = await createActivityEvent(values);

      if (response.errors) {
        const errors = response.errors;
        console.log(errors);
      }

      toast({
        title: response.message,
        variant: 'default',
      });
      form.reset();
      router.push(`/admin/activities`);
    } catch (e: any) {
      console.error(e);
      toast({
        title: e.message as string,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (val) => {
    console.log(form);
    console.log(form.getValues());
    console.log(form.formState);
  };

  return (
    <>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Event
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={onChange}>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                  {' '}
                  {field.name}{' '}
                </FormLabel>
                <FormControl className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="min_volunteers"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    <input
                      type="number"
                      {...field}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...form.register('min_volunteers', {
                        setValueAs: (v) =>
                          v === '' ? undefined : parseInt(v, 10),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="max_volunteers"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    <input
                      type="number"
                      {...field}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...form.register('max_volunteers', {
                        setValueAs: (v) =>
                          v === '' ? undefined : parseInt(v, 10),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="leaders"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    {leaders && leaders.length > 0 && (
                      <ComboBox
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ref={field.ref}
                        items={leaders}
                        multiple={true}
                        onChange={field.onChange}
                        value={field.value ?? []}
                        key={'tags'}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="is_dates_announced"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    Announce Dates
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      ref={field.ref}
                      disabled={field.disabled}
                      name={field.name}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="date_announcement_text"
            render={({ field }) => (
              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                    {' '}
                    {field.name}{' '}
                  </FormLabel>
                  <FormControl className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ActivityEventForm;
