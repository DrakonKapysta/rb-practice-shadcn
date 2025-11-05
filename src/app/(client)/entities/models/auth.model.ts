import { ICallbackResult, IResult } from '@/app/(client)/shared/interfaces'

export enum EAuthQueryKey {
  AUTH_SESSIONS = 'auth-sessions',
}
export interface IRegisterCredentials extends ICallbackResult {
  name: string
  email: string
  password: string
  callbackURL?: string
}

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export interface IRegister extends ICallbackResult {
  credentials: IRegisterCredentials
}

export interface IRegisterResponse extends IResult<void> {}

export interface ILoginCredentials {
  email: string
  password: string
  callbackURL?: string
}

export interface ILogin extends ICallbackResult {
  credentials: ILoginCredentials
}

export interface ILoginResponse extends IResult<void> {}

export interface IRevokeSessionQuery extends ICallbackResult {
  sessionToken: string
}

export interface IUpdateUser extends ICallbackResult {
  name?: string
  surname?: string
  phoneNumber?: string
  address?: string
  country?: string
  birthDate?: Date
  gender?: string
}

export interface IChangeEmail extends ICallbackResult {
  email: string
  callbackURL?: string
}

export interface IChangePassword extends ICallbackResult {
  password: string
  newPassword: string
  revokeOtherSessions?: boolean
}
