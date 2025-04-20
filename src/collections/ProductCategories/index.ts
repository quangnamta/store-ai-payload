import { isAdminOrProductWrite } from '@/access/isAdminOrProductWrite'
import { isAll } from '@/access/isAll'
import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminOrProductWrite,
    read: isAll,
    update: isAdminOrProductWrite,
    delete: isAdminOrProductWrite,
  },
  fields: [
    {
      label: 'General Info',
      type: 'collapsible',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'join',
      collection: 'products',
      on: 'category',
    },
  ],
}
