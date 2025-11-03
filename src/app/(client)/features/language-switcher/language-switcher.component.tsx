'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/(client)/shared/ui/select'
import { routing, usePathname, useRouter } from '@/pkg/libraries/locale'

import { LANGUAGE_SWITCHER_KEYS_LABELS } from './language-switcher.constants'
import { FC } from 'react'
import { cn } from '@/pkg/utils/ui'

interface IProps {
  className?: string
}

const LanguageSwitcherComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props

  const t = useTranslations('header')

  const locale = useLocale()

  const pathname = usePathname()

  const router = useRouter()

  const handleLanguageChange = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ua)/, '')

    router.replace(pathnameWithoutLocale, { locale: newLocale })
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className={cn('w-fit capitalize', className)} aria-label={t('language')}>
        <SelectValue>
          {LANGUAGE_SWITCHER_KEYS_LABELS[(locale as keyof typeof LANGUAGE_SWITCHER_KEYS_LABELS) || 'en']}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {LANGUAGE_SWITCHER_KEYS_LABELS[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageSwitcherComponent
