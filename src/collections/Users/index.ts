import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { admin } from '@/access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: admin,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      saveToJWT: true,
      options: [
        {
          label: 'User',
          value: 'USER',
        },
        {
          label: 'Admin',
          value: 'ADMIN',
        },
      ],
    },
  ],
  timestamps: true,
}
