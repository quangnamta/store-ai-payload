import { Access, FieldAccess } from 'payload'

export const isAdminOrProductWrite: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('product_write'))
}

export const isAdminOrProductWriteFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('product_write'))
}
