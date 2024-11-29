import { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'
import { Event } from '@/payload-types'
import { DateTime } from 'luxon'

export const updateEventTime: CollectionBeforeChangeHook<Event> = ({ data, req: { payload } }) => {
  payload.logger.info('UpdateEventTime Hook triggered')
  if (!data?.dateTime?.allDay) return

  const { fromTime, toTime } = data?.dateTime

  console.log(fromTime, toTime)

  if (fromTime)
    data.dateTime.fromTime = DateTime.fromJSDate(new Date(fromTime))
      .startOf('day')
      .toJSDate()
      .toISOString()
  if (toTime)
    data.dateTime.toTime = DateTime.fromJSDate(new Date(toTime))
      .endOf('day')
      .toJSDate()
      .toISOString()

  return data
}
