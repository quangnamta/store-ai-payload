import { Access, FieldAccess } from 'payload'

export const isAdminOrOrderWrite: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('order_write'))
}

export const isAdminOrOrderWriteFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('order_write'))
}
