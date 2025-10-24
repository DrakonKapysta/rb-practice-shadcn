import { type NextRequest } from 'next/server'
import { getLocale } from 'next-intl/server'

import { type EmailOtpType } from '@supabase/supabase-js'

import { createServerClient } from '@/pkg/integrations/supabase'
import { redirect } from '@/pkg/libraries/locale'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const locale = await getLocale()

  if (token_hash && type) {
    const supabase = await createServerClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirect({ href: next, locale })
    }
  }

  redirect({ href: '/error', locale })
}
