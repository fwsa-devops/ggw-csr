import { EventCard, CardEventData } from '@/components/Card/event'
import { cn } from '@/utilities/cn'

export type Props = {
  events: CardEventData[]
}

export const CollectionArchiveEvent: React.FC<Props> = (props) => {
  const { events } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {events?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <EventCard className="h-full" doc={result} relationTo="events" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
