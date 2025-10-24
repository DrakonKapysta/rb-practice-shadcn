import { IResult } from '@/app/(client)/shared/interfaces'

export interface IRegister {
  name: string
  email: string
  password: string
  callbackURL?: string
}

export interface IRegisterResponse extends IResult<void> {}

export interface ILogin {
  email: string
  password: string
  callbackURL?: string
}

export interface ILoginResponse extends IResult<void> {}
