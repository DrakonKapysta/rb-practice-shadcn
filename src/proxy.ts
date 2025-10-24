import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/libraries/locale/routing'

const authRoutes = ['/login', '/register']

export async function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req)

  const i18nRes = createMiddleware(routing)(req)

  if (authRoutes.includes(req.nextUrl.pathname)) {
    return i18nRes
  }

  if (!sessionCookie) {
    const redirectUrl = new URL('/login', req.url)
    const redirectResponse = NextResponse.redirect(redirectUrl, 302)

    i18nRes.headers.forEach((value, key) => {
      redirectResponse.headers.set(key, value)
    })

    return redirectResponse
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
