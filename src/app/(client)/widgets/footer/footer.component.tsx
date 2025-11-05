import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { LanguageSwitcherComponent } from '@/app/(client)/features/language-switcher'
import { Button, Input } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

interface IProps {}

const FooterComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('footer')

  return (
    <footer className='bg-background/95 supports-backdrop-filter:bg-background/60 border-t backdrop-blur'>
      <div className='container mx-auto px-4 py-8 lg:px-6'>
        <div className='flex flex-col justify-between gap-8 md:flex-row'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>{t('logo')}</h3>

            <p className='text-muted-foreground text-sm'>{t('description')}</p>
          </div>

          <div className='flex flex-col justify-between gap-8 md:flex-row'>
            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>{t('quickLinks.title')}</h4>

              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('quickLinks.home')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('quickLinks.about')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('quickLinks.services')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('quickLinks.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>{t('resources.title')}</h4>

              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('resources.documentation')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('resources.helpCenter')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('resources.privacyPolicy')}
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    {t('resources.termsOfService')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>{t('stayUpdated.title')}</h4>

              <p className='text-muted-foreground text-sm'>{t('stayUpdated.description')}</p>

              <div className='flex flex-col justify-center gap-4 md:flex-row md:items-center'>
                <Input
                  type='email'
                  placeholder={t('stayUpdated.emailPlaceholder')}
                  className='border-input bg-background focus:ring-ring flex-1 rounded-md border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none'
                />

                <Button size='sm' className='w-full shrink-0 md:w-auto'>
                  {t('stayUpdated.subscribe')}
                </Button>
              </div>

              <LanguageSwitcherComponent className='w-full' />
            </div>
          </div>
        </div>

        <div className='border-border mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <p className='text-muted-foreground text-sm'>{t('copyright')}</p>

            <div className='flex space-x-4'>
              <Button variant='ghost' size='sm'>
                {t('social.twitter')}
              </Button>

              <Button variant='ghost' size='sm'>
                {t('social.github')}
              </Button>

              <Button variant='ghost' size='sm'>
                {t('social.linkedin')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
