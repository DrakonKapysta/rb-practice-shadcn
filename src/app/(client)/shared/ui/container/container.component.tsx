import { cn } from '@/pkg/utils/ui'
import type { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  className?: string
  variant?: 'main' | 'section'
}

const ContainerComponent: FC<Readonly<IProps>> = (props) => {
  const { children, className = '', variant = 'main' } = props

  return (
    <>
      {variant === 'main' ? (
        <main className={cn(`mx-auto flex min-h-svh w-full flex-col gap-6 overflow-x-hidden pt-4 pb-8`, className)}>
          {children}
        </main>
      ) : (
        <section className={cn(`mx-auto flex w-full flex-col gap-4`, className)}>{children}</section>
      )}
    </>
  )
}

export default ContainerComponent
