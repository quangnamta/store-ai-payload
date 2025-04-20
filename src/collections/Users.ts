import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import { isDashboardAccess } from '@/access/isDashboardAccess'
import type { CollectionConfig } from 'payload'

const ROLE_OPTIONS = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Product - Read',
    value: 'product_read',
  },
  {
    label: 'Product - Write',
    value: 'product_write',
  },
  {
    label: 'Order - Read',
    value: 'order_read',
  },
  {
    label: 'Order - Write',
    value: 'order_write',
  },
  {
    label: 'Customer',
    value: 'customer',
  },
]

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: isDashboardAccess,
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: ROLE_OPTIONS,
    },
  ],
}
