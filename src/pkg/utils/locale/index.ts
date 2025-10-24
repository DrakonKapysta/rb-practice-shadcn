import { NextRequest, NextResponse } from 'next/server'

const withIntlHeaders = (res: NextResponse, headers: Headers) => {
  headers.forEach((value, key) => res.headers.set(key, value))
  return res
}

export const makeRedirect = (
  path: string,
  isLocaleProvided: boolean,
  headerLocale: string | null,
  req: NextRequest,
  IntlHeaders: Headers,
  status: number = 307,
) => {
  const redirectPath = isLocaleProvided ? `/${headerLocale}${path}` : path
  return withIntlHeaders(NextResponse.redirect(new URL(redirectPath, req.url), status), IntlHeaders)
}
