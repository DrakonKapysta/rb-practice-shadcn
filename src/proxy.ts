import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/libraries/locale/routing'

import { auth } from './pkg/integrations/better-auth'
import { AuthUtil } from './pkg/utils/auth'

const authRoutes = ['/login', '/register', '/auth', '/error']

const adminRoutes = ['/admin-dashboard']

export async function proxy(req: NextRequest) {
  const i18nRes = createMiddleware(routing)(req)

  const headerLocale = i18nRes.headers.get('x-middleware-request-x-next-intl-locale') ?? routing.defaultLocale

  const [_, predefinedLocale, ...segments] = req.nextUrl.pathname.split('/')

  const pathWithoutLocale = '/' + segments.join('/')

  const isLocaleProvided = headerLocale == predefinedLocale

  const session = getSessionCookie(req)

  const isAuthRoute = authRoutes.includes(isLocaleProvided ? pathWithoutLocale : req.nextUrl.pathname)

  const isAdminRoute = adminRoutes.includes(isLocaleProvided ? pathWithoutLocale : req.nextUrl.pathname)

  if (!session) {
    if (isAuthRoute) {
      return i18nRes
    }

    return NextResponse.redirect(new URL(isLocaleProvided ? `/${predefinedLocale}/login` : '/login', req.url), {
      headers: i18nRes.headers,
    })
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL(isLocaleProvided ? `/${predefinedLocale}/` : '/', req.url), {
      headers: i18nRes.headers,
    })
  }

  if (isAdminRoute) {
    const session = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: req.headers,
    })

    if (!session || !AuthUtil.hasAccessToAdminPanel(session.user?.role)) {
      return NextResponse.redirect(new URL('/', req.url), {
        headers: i18nRes.headers,
      })
    }
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
