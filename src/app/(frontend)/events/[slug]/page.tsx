import type { Metadata } from 'next'

import { RelatedEvents } from '@/blocks/RelatedEvents/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Event } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { EventHero } from '@/heros/EventHero'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = events.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Event({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/events/' + slug
  const event = await queryEventBySlug({ slug })

  if (!event) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <EventHero event={event} />


      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {/* <RichText
            className="max-w-[48rem] mx-auto"
            content={event.content}
            enableGutter={false}
          /> */}
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <RelatedEvents
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={event.relatedEvents.filter((event) => typeof event === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const events = await queryEventBySlug({ slug })

  return generateMeta({ doc: events })
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
