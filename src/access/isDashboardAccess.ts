import { Access, PayloadRequest } from 'payload'

export const isDashboardAccess = ({ req }: { req: PayloadRequest }): boolean | Promise<boolean> => {
  const user = req.user
  return Boolean(user && !user.roles?.includes('customer'))
}
