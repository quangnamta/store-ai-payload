import { isAdminOrProductWrite } from '@/access/isAdminOrProductWrite'
import { isAll } from '@/access/isAll'
import type { CollectionConfig } from 'payload'

export const ProductOptions: CollectionConfig = {
  slug: 'product-options',
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
      name: 'sortOrder',
      type: 'number',
    },
    {
      label: 'General Info',
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'price',
              type: 'number',
              min: 0,
              required: true,
            },
          ],
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'product-option-categories',
          required: true,
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
      ],
    },
  ],
}
