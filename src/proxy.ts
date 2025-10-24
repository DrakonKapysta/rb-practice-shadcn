import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/libraries/locale/routing'

export async function proxy(req: NextRequest) {
  const i18nRes = createMiddleware(routing)(req)

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
