import { Access, FieldAccess } from 'payload'

export const isAdminOrProductRead: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('product_read'))
}

export const isAdminOrProductReadFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('product_read'))
}
