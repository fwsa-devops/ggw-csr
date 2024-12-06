import { DateTime } from 'luxon'

export type EventDate = {
  from: string
  fromTime: string
  to: string
  toTime: string
  timezone: string
  allDay: boolean | null | undefined
}

export function eventDateFormat(props: EventDate) {
  const fromDateTime = DateTime.fromISO(props.from, { zone: props.timezone })
  const fromTime = DateTime.fromISO(props.fromTime, { zone: props.timezone })
  const toDateTime = DateTime.fromISO(props.to, { zone: props.timezone })
  const toTime = DateTime.fromISO(props.toTime, { zone: props.timezone })

  let formattedDate: string

  if (fromDateTime.hasSame(toDateTime, 'day')) {
    // One-day event
    if (props.allDay) {
      formattedDate = `${fromDateTime.toFormat('MMM d, cccc')}, ${fromTime.toFormat('hh:mm a')} onwards`
    } else {
      formattedDate = `${fromDateTime.toFormat('MMM d, cccc')}, ${fromTime.toFormat('hh:mm a')} to ${toTime.toFormat('hh:mm a')}`
    }
  } else {
    // Multi-day event
    if (props.allDay) {
      formattedDate = `${fromDateTime.toFormat('MMM d, cccc')} to ${toDateTime.toFormat('MMM d, cccc')}`
    } else {
      formattedDate = `${fromDateTime.toFormat('MMM d, cccc hh:mm a')} to ${toDateTime.toFormat('MMM d, cccc hh:mm a')}`
    }
  }

  return formattedDate
}
