export interface IResultError {
  message: string
  statusCode: number
}

export interface IResult<T> {
  success: boolean
  error?: IResultError
  result?: T
}
