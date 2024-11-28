import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Event } from '@/payload-types'

import { EventCard } from '../../components/Card/event'

export type RelatedEventsProps = {
  className?: string
  docs?: Event[]
  introContent?: any
}

export const RelatedEvents: React.FC<RelatedEventsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <EventCard key={index} doc={doc} relationTo="events" showCategories />
        })}
      </div>
    </div>
  )
}
