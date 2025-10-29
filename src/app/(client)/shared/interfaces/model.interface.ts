import { ErrorContext } from 'better-auth/react'

export interface IResultError {
  message: string
  statusCode: number
}

export interface IResult<T> {
  success: boolean
  error?: IResultError
  result?: T
}

export interface ICallbackResult<T = ErrorContext> {
  successCallback?: () => void
  errorCallback?: (error: T) => void
  requestCallback?: () => void
}
