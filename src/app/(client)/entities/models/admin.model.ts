import { ICallbackResult } from '@/app/(client)/shared/interfaces'

export enum EAdminQueryKey {
  ADMIN_USERS = 'admin-users',
}

export interface IAdminUsersQuery extends ICallbackResult {
  limit: number
  offset: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface IBannUserQuery extends ICallbackResult {
  userId: string
  banReason: string
  banExpiresIn: number
}

export interface IUnbanUserQuery extends ICallbackResult {
  userId: string
}

export interface IRevokeSessionQuery extends ICallbackResult {
  sessionToken: string
}

export interface ISetRoleQuery extends ICallbackResult {
  userId: string
  role: 'admin' | 'user'
}

export interface IImpersonateUserQuery extends ICallbackResult {
  userId: string
}
