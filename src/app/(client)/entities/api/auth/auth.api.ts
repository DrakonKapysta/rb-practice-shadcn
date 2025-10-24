'use server'

import { getLocale } from 'next-intl/server'

import { createServerClient } from '@/pkg/integrations/supabase'
import { redirect } from '@/pkg/libraries/locale'

export async function login(formData: FormData) {
  const supabase = await createServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  const locale = await getLocale()
  if (error) {
    return { error: { message: 'Invalid credentials' } }
  }

  redirect({ href: '/', locale })
}

export async function signup(formData: FormData) {
  const supabase = await createServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  const locale = await getLocale()

  if (error) {
    return { error: { message: 'Something went wrong. Please try again.' } }
  }

  redirect({ href: '/', locale })
}
