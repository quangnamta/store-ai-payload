import type { CollectionConfig } from 'payload'
import { changingProductPriceHook } from './hooks/beforeChangeField'
import { calculateGrandTotalHook, calculateSubTotalHook } from './hooks/afterReadField'
import { recalculateButton } from './components/recalculateButton'
import { isAll } from '@/access/isAll'
import { isAdminOrOrderWrite, isAdminOrOrderWriteFieldLevel } from '@/access/isAdminOrOrderWrite'

const IS_PRICE_LOCKED_OPTIONS = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const COUNTRY_SELECT_OPTION = [
  {
    label: 'Vietnam',
    value: 'vietnam',
  },
]

const STATUS_OPTIONS = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'On-hold',
    value: 'on_hold',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Canceled',
    value: 'cancelled',
  },
  {
    label: 'Refunded',
    value: 'refunded',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
]
// Status to shipping info
// is locked view can only view by admin
// Adding customer to cart
export const Carts: CollectionConfig = {
  slug: 'carts',
  access: {
    create: isAll,
    read: isAll,
    update: isAdminOrOrderWrite,
    delete: isAdminOrOrderWrite,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'cartDetails',
          fields: [
            {
              name: 'isPriceLocked',
              type: 'radio',
              required: true,
              options: IS_PRICE_LOCKED_OPTIONS,
              access: {
                create: isAdminOrOrderWriteFieldLevel,
              },
              defaultValue: 'no',
            },
            {
              name: 'orderStatus',
              type: 'select',
              required: true,
              access: {
                create: isAdminOrOrderWriteFieldLevel,
              },
              options: STATUS_OPTIONS,
              defaultValue: 'pending',
            },
            {
              name: 'cartItems',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'product',
                      type: 'relationship',
                      relationTo: 'products',
                      required: true,
                    },
                    {
                      name: 'price',
                      type: 'number',
                      required: true,
                      admin: {
                        readOnly: true,
                      },
                      hooks: {
                        beforeChange: [changingProductPriceHook],
                      },
                    },
                  ],
                },
                {
                  name: 'productOptions',
                  type: 'relationship',
                  relationTo: 'product-options',
                  hasMany: true,
                  admin: {
                    isSortable: true,
                    allowCreate: false,
                    allowEdit: false,
                  },
                  filterOptions: ({ siblingData }: { siblingData: any }) => {
                    return {
                      product: { equals: siblingData?.product },
                    }
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'quantity',
                      type: 'number',
                      required: true,
                      min: 1,
                      defaultValue: 1,
                    },
                    {
                      name: 'subTotal',
                      type: 'number',
                      admin: {
                        readOnly: true,
                      },
                      hooks: {
                        afterRead: [calculateSubTotalHook],
                      },
                      virtual: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'discount',
              type: 'number',
              required: true,
              min: 0,
              defaultValue: 0,
            },
            {
              name: 'grandTotal',
              type: 'number',
              admin: {
                readOnly: true,
              },
              hooks: {
                afterRead: [calculateGrandTotalHook],
              },
              virtual: true,
            },
            {
              name: 'orderNotes',
              type: 'textarea',
            },
            recalculateButton,
          ],
        },
        {
          name: 'shippingDetails',
          fields: [
            {
              name: 'emailAddress',
              type: 'email',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'lastName',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'address',
              type: 'text',
              required: true,
            },
            {
              name: 'apt',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'country',
                  type: 'select',
                  options: COUNTRY_SELECT_OPTION,
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'province',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
