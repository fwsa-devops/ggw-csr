import React from 'react'

import type { Event } from '@/payload-types'
import NextImage from 'next/image'
import RichText from '@/components/RichText'
import { Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { eventDateFormat } from '@/utilities/dateFormat'

export const EventHero: React.FC<{
  event: Event
}> = ({ event }) => {
  const {
    categories,
    meta: { image: metaImage } = {},
    populatedAuthors,
    publishedAt,
    title,
  } = event

  console.log(event)

  return (
    <section className="container antialiased z-10">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 xl:gap-16">
          <div className="col-span-2 space-y-6">
            <div className="shrink-0 lg:max-w-lg mx-auto">
              {metaImage && typeof metaImage !== 'string' && typeof metaImage !== 'number' && (
                <NextImage
                  // fill={true}
                  width={'1000'}
                  height={'1000'}
                  className="object-cover rounded-lg"
                  src={metaImage.url!}
                  alt={metaImage.alt || ''}
                />
              )}
            </div>

            {populatedAuthors && (
              <div className="lg:flex flex-col gap-1 hidden">
                <p className="font-semibold text-xl">Hosted by</p>
                {populatedAuthors.map((author, index) => {
                  const { name } = author

                  const isLast = index === populatedAuthors.length - 1
                  const secondToLast = index === populatedAuthors.length - 2

                  return (
                    <React.Fragment key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && (
                        <React.Fragment>, </React.Fragment>
                      )}
                      {secondToLast && populatedAuthors.length === 2 && (
                        <React.Fragment> </React.Fragment>
                      )}
                      {!isLast && populatedAuthors.length > 1 && (
                        <React.Fragment>and </React.Fragment>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0 col-span-3 lg:space-y-8">
            <h1 className="font-semibold text-3xl md:text-4l lg:text-5xl !leading-snug md:!leading-tight">
              {title}
            </h1>

            <div className="mt-4 sm:items-center space-y-3">
              <p className="flex items-center font-medium">
                <Calendar className="mr-2" size={20} />
                {eventDateFormat(event.dateTime as any)}
              </p>

              <p className="flex items-center font-medium">
                <MapPin className="mr-2 block" size={20} />
                {event.location.address?.name}
              </p>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                Register
              </a>
            </div>

            {populatedAuthors && (
              <>
                <hr className="lg:hidden block my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <div className="flex flex-col gap-1 lg:hidden">
                  <p className="font-semibold text-lg">Hosted by</p>
                  {populatedAuthors.map((author, index) => {
                    const { name } = author

                    const isLast = index === populatedAuthors.length - 1
                    const secondToLast = index === populatedAuthors.length - 2

                    return (
                      <React.Fragment key={index}>
                        {name}
                        {secondToLast && populatedAuthors.length > 2 && (
                          <React.Fragment>, </React.Fragment>
                        )}
                        {secondToLast && populatedAuthors.length === 2 && (
                          <React.Fragment> </React.Fragment>
                        )}
                        {!isLast && populatedAuthors.length > 1 && (
                          <React.Fragment>and </React.Fragment>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              </>
            )}

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <RichText
              className="max-w-[48rem] mx-auto"
              content={event.content}
              enableGutter={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
