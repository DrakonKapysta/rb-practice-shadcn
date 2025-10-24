import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/libraries/locale/routing'

const publicRoutes = ['/login', '/register', '/auth', '/error']

const intlMiddleware = createMiddleware(routing)

export async function proxy(req: NextRequest) {
  const intlResponse = intlMiddleware(req)
  const locale = intlResponse.headers.get('x-middleware-request-x-next-intl-locale')

  const pathname = req.nextUrl.pathname
  const [, _, ...segments] = pathname.split('/')
  const pathWithoutLocale = '/' + segments.join('/')

  const isPublic = publicRoutes.includes(pathname) || publicRoutes.includes(pathWithoutLocale)

  const session = getSessionCookie(req)

  if (!session && !isPublic) {
    const loginUrl = new URL(`/${locale ?? 'en'}/login`, req.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (session && (pathname.endsWith('/login') || pathWithoutLocale === '/login')) {
    const homeUrl = new URL(`/${locale ?? 'en'}`, req.url)
    return NextResponse.redirect(homeUrl)
  }

  return intlResponse
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
