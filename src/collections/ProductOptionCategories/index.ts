import { isAdminOrProductWrite } from '@/access/isAdminOrProductWrite'
import { isAll } from '@/access/isAll'
import type { CollectionConfig } from 'payload'

/**
 * - base: Size (s m l)
 * - unique: Something unique but not a neccesity
 * - multiple: Multiple can be chosen
 */
const PRODUCT_OPTION_TYPE = [
  {
    label: 'Base Option',
    value: 'base',
  },
  {
    label: 'Unique Option',
    value: 'unique',
  },
  {
    label: 'Multiple Options',
    value: 'multiple',
  },
]

export const ProductOptionsCategories: CollectionConfig = {
  slug: 'product-option-categories',
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
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'optionType',
          type: 'select',
          options: PRODUCT_OPTION_TYPE,
          required: true,
        },
      ],
    },
  ],
}
