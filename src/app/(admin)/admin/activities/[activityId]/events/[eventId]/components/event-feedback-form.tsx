'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { eventFeedbackFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from './file-upload';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UploadFileResponse } from 'uploadthing/client';
import { createEventFeedback } from '@/components/actions/action';
import { revalidatePath } from 'next/cache';

const EventFeedbackForm = ({
  eventId,
  activityId,
}: {
  eventId: string;
  activityId: string;
}) => {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [containAssets, setContainAssets] = useState<boolean>(false);

  if (!session?.user) {
    return <>Un-Authorized User</>;
  }

  const form = useForm<z.infer<typeof eventFeedbackFormSchema>>({
    resolver: zodResolver(eventFeedbackFormSchema),
    defaultValues: {
      activityId: activityId,
      author_id: session?.user?.email as string,
      comment: '',
      eventId: eventId,
    },
  });

  const onSubmit = async (value: z.infer<typeof eventFeedbackFormSchema>) => {
    try {
      // console.log('onSubmit', value);

      const resp = await createEventFeedback(value);
      // console.log(resp);

      if (!resp.success) {
        throw resp;
      }

      revalidatePath(`/activities/${activityId}/${eventId}`);
      form.setValue('assets', []);
      form.reset();
    } catch (error) {
      // console.log(error);
    } finally {
      // console.log('finally');
    }
  };

  const onChange = (value: UploadFileResponse[] | undefined) => {
    if (!value) {
      return;
    }

    form.setValue(
      'assets',
      value?.map((_v) => ({ name: _v.name, url: _v.url })),
    );

    if (form.getValues('assets').length > 0) setContainAssets(true);
  };

  return (
    <>
      <div className={cn('pb-6', isLoading ? 'opacity-50' : '')}>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Event Feedback
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly.
        </p>

        {isLoading && <Loader />}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              'border-2 border-gray-200 px-3 rounded-md mt-4 pb-4',
              isLoading ? 'opacity-50' : '',
            )}
          >
            <FormField
              control={form.control}
              name="assets"
              defaultValue={[]}
              render={({ field }) => (
                <div className="mt-6">
                  <FormItem>
                    <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                      {' '}
                      Pictures & Videos{' '}
                    </FormLabel>
                    <FormControl className="mt-2">
                      <FileUpload onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div className="comment-tooltip">
              ⓘ Please add few images or videos to submit a comment
            </div>
            <FormField
              control={form.control}
              name="comment"
              defaultValue={''}
              render={({ field }) => (
                <div className="mt-6">
                  <FormItem>
                    <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900">
                      {' '}
                      {field.name}{' '}
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Textarea
                        placeholder="Tell us a little bit about the event"
                        className="resize-none"
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
                disabled={!containAssets && !form.formState.isSubmitting}
                className="ml-auto "
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EventFeedbackForm;
