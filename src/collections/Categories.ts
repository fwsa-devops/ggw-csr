import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { admin } from '@/access/admin'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
