"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { activityFormSchema } from '@/types';
import { createNewActivity } from '@/components/events/utils/api';
import { Activity } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Editor } from '@/components/markdown-editor';


const ActivityForm = ({ initialData }: { initialData: Activity | null }) => {

  const { data: session, status } = useSession();

  if (!session?.user) {
    return (
      <>
        Un-Authorized User
      </>
    )
  }

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      status: initialData?.status ?? 'OPEN',
      author_id: session?.user?.email as string
    }
  })


  const onSubmit = async (values: z.infer<typeof activityFormSchema>) => {

    try {
      console.log(values);
      // const response = await createNewActivity(values);

      // if (response.errors) {
      //   const errors = response.errors;
      //   console.log(errors);
      // }

      form.reset();
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <>

      <Form  {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FormField
            control={form.control}
            name='name'
            defaultValue={initialData?.name ?? ''}
            render={({ field }) => (

              <div>
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                  {/* <FormDescription>
                </FormDescription> */}
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='summary'
            defaultValue={initialData?.summary ?? ''}
            render={({ field }) => (

              <div>
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                  {/* <FormDescription>
                </FormDescription> */}
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='description'
            defaultValue={initialData?.description ?? ''}
            render={({ field }) => (

              <div >

                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900" >  {field.name} </FormLabel>
                  <FormControl className='mt-2'>

                    {/* <textarea
                      className="block w-full rounded-md border-0 h-40 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    >
                    </textarea> */}

                    <Editor
                      theme="snow"
                      {...field}
                      className="block w-full bg-white rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </FormControl>
                  <FormMessage />
                  {/* <FormDescription>
                </FormDescription> */}
                </FormItem>

              </div>

            )} />

          <FormField
            control={form.control}
            name='city'
            defaultValue={initialData?.city ?? ''}
            render={({ field }) => (

              <div>
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                  {/* <FormDescription>
              </FormDescription> */}
                </FormItem>
              </div>

            )} />

          <FormField
            control={form.control}
            name='duration'
            defaultValue={initialData?.duration ?? 12}
            render={({ field }) => (

              <div>
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
                  {/* <FormDescription>
                </FormDescription> */}
                </FormItem>
              </div>

            )} />



          <FormField
            control={form.control}
            name='cover'
            defaultValue={initialData?.cover ?? ''}
            render={({ field }) => (

              <div>
                <FormItem>
                  <FormLabel className="capitalize block text-sm font-medium leading-6 text-gray-900"> {field.name} </FormLabel>
                  <FormControl className='mt-2'>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                  {/* <FormDescription>
                </FormDescription> */}
                </FormItem>
              </div>

            )} />


          <Button
            // disabled={form.formState.isSubmitting}
            className="ml-auto mt-6"
            type="submit">
            Submit
          </Button>

        </form>

      </Form >

    </>
  )

}

export default ActivityForm;