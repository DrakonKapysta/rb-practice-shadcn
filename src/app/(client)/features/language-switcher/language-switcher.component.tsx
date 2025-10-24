'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { Dropdown } from '@heroui/react'

import { routing, usePathname, useRouter } from '@/pkg/libraries/locale'

import { LANGUAGE_SWITCHER_KEYS_LABELS } from './language-switcher.constants'

const LanguageSwitcherComponent = () => {
  const t = useTranslations('header')

  const locale = useLocale()

  const pathname = usePathname()

  const router = useRouter()

  const handleLanguageChange = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ua)/, '')
    router.replace(pathnameWithoutLocale, { locale: newLocale })
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='bordered'
          className='capitalize'
          endContent={<ChevronDown size={18} />}
          aria-label={t('language')}
        >
          {LANGUAGE_SWITCHER_KEYS_LABELS[(locale as keyof typeof LANGUAGE_SWITCHER_KEYS_LABELS) || 'en']}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        aria-label={t('language')}
        selectionMode='single'
        variant='flat'
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {routing.locales.map((loc) => (
          <DropdownItem
            key={loc}
            textValue={LANGUAGE_SWITCHER_KEYS_LABELS[loc]}
            className={locale === loc ? 'bg-default-100' : ''}
          >
            <div className='flex items-center justify-between gap-2'>
              <span>{LANGUAGE_SWITCHER_KEYS_LABELS[loc]}</span>

              {locale === loc && <Check className='-mr-6 inline-block' size={18} />}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LanguageSwitcherComponent
