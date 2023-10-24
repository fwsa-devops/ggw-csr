"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { activityFormSchema } from '@/types';
import { createNewActivity } from '@/components/events/utils/api';
import { Activity, ActivityTags, Tag } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Editor } from '@/components/editors/markdown-editor';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTags } from '@/components/events/utils';
import MultiSelect from '@/components/ui/dropdown/multi-select';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface IActivityForm extends Activity {
  tags: string[]
}

const ActivityForm = ({ initialData }: { initialData: IActivityForm | null }) => {

  const { data: session, status } = useSession();

  if (!session?.user) {
    return (
      <>
        Un-Authorized User
      </>
    )
  }

  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchAllTags();
  }, [])


  const fetchAllTags = async () => {
    const tags = await getAllTags();
    setTags(tags);
  };

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: initialData as any ?? {
      status: 'OPEN',
      author_id: session?.user?.email as string,
      tags: []
    }
  })


  const onSubmit = async (values: z.infer<typeof activityFormSchema>) => {

    try {
      console.log(values);
      const response = await createNewActivity(values);

      if (response.errors) {
        const errors = response.errors;
        console.log(errors);
      }

      form.reset();
      router.push('/admin/activities')
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <>

      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Activity
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        This information will be displayed publicly.
      </p>


      <Form  {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FormField
            control={form.control}
            name='name'
            defaultValue={initialData?.name ?? ''}
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='summary'
            defaultValue={initialData?.summary ?? ''}
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='description'
            defaultValue={initialData?.description ?? ''}
            render={({ field }) => (

              <div className="mt-6">

                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900" >  {field.name} </FormLabel>
                  <FormControl className='mt-2'>

                    <Editor
                      theme="snow"
                      {...field}
                      className="block w-full bg-white rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>

              </div>

            )} />

          <FormField
            control={form.control}
            name='city'
            defaultValue={initialData?.city ?? ''}
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='duration'
            defaultValue={initialData?.duration ?? 120}
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input type='number'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...form.register('duration', {
                        setValueAs: (v) => v === "" ? undefined : parseInt(v, 10),
                      })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

            )} />



          <FormField
            control={form.control}
            name='cover'
            defaultValue={initialData?.cover ?? ''}
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              </div>

            )} />


          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>

                    {
                      tags.length > 0 &&
                      < MultiSelect
                        ref={field.ref}
                        items={tags}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    }

                  </FormControl>
                  <FormMessage />

                </FormItem>
              </div>

            )} />


          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (

              <div className="mt-6">
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>

                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPEN">OPEN</SelectItem>
                        <SelectItem value="DRAFT">DRAFT</SelectItem>
                        <SelectItem value="CLOSED">CLOSED</SelectItem>
                      </SelectContent>
                    </Select>

                  </FormControl>
                  <FormMessage />

                </FormItem>
              </div>

            )} />

          <div className="w-full mt-6 flex justify-end">

            <Button
              disabled={form.formState.isSubmitting}
              className="ml-auto "
              type="submit">
              Submit
            </Button>
          </div>

        </form>

      </Form >

    </>
  )

}

export default ActivityForm;