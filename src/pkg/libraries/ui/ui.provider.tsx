'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

import { Toaster } from '@/app/(client)/shared/ui/sonner'

interface IProps {
  children: ReactNode
  locale?: string
}

const UiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}

      <Toaster richColors={true} />
    </NextThemesProvider>
  )
}

export default UiProvider
