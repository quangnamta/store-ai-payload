import { Access, FieldAccess } from 'payload'

export const isAdminOrOrderRead: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('order_read'))
}

export const isAdminOrOrderReadFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('order_read'))
}
