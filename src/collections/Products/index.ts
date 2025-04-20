import type { CollectionConfig } from 'payload'
import { deleteProductImagesHook, deleteProductOptionsHook } from './hooks/beforeDelete'
import { isAdminOrProductWrite } from '@/access/isAdminOrProductWrite'
import { isAll } from '@/access/isAll'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeDelete: [deleteProductOptionsHook, deleteProductImagesHook],
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
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'specificationTable',
          type: 'array',
          fields: [
            {
              name: 'key',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'relatedProductOptions',
      type: 'join',
      collection: 'product-options',
      on: 'product',
      admin: {
        allowCreate: true,
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
    },
  ],
}
