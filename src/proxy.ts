import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/libraries/locale/routing'

import { makeRedirect } from './pkg/utils/locale'

const authRoutes = ['/login', '/register']

export async function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req)
  const i18nRes = createMiddleware(routing)(req)
  const headers = i18nRes.headers

  const headerLocale = headers.get('x-middleware-request-x-next-intl-locale')

  const [_, predefinedLocale, ...segments] = req.nextUrl.pathname.split('/')
  const pathWithoutLocale = '/' + segments.join('/')

  const isLocaleProvided = headerLocale === predefinedLocale

  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname) || authRoutes.includes(pathWithoutLocale)

  if (!sessionCookie) {
    if (isAuthRoute) return i18nRes
    return makeRedirect('/login', isLocaleProvided, headerLocale, req, headers)
  }

  if (sessionCookie && isAuthRoute) {
    return makeRedirect('/', isLocaleProvided, headerLocale, req, headers)
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
