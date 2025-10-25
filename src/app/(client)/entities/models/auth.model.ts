import { ErrorContext } from 'better-auth/react'

import { IResult } from '@/app/(client)/shared/interfaces'

export interface IRegisterCredentials {
  name: string
  email: string
  password: string
  callbackURL?: string
}
export interface IRegister {
  credentials: IRegisterCredentials

  successCallback?: () => void
  errorCallback?: (error: ErrorContext) => void
  requestCallback?: () => void
}

export interface IRegisterResponse extends IResult<void> {}

export interface ILoginCredentials {
  email: string
  password: string
  callbackURL?: string
}

export interface ILogin {
  credentials: ILoginCredentials

  successCallback?: () => void
  errorCallback?: (error: ErrorContext) => void
  requestCallback?: () => void
}

export interface ILoginResponse extends IResult<void> {}
