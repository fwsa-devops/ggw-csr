import { CollectionAfterChangeHook } from 'payload'
import type { Event } from '@/payload-types'
import { revalidatePath } from 'next/cache'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/events/${doc.slug}`
    payload.logger.info(`Revalidating event at path: ${path}`)

    revalidatePath(path)
  }

  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/events/${previousDoc.slug}`
    payload.logger.info(`Revalidating old event at path: ${oldPath}`)
    revalidatePath(oldPath)
  }
}
