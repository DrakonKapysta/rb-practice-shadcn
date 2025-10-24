'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

import { SwitchProps, useSwitch, VisuallyHidden } from '@heroui/react'

import { DARK_THEME, LIGHT_THEME } from './theme-switcher.constants'

interface IProps extends SwitchProps {
  className?: string
}

const ThemeSwitcherComponent: FC<Readonly<IProps>> = (props) => {
  const { className = '', ...rest } = props

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(rest)

  if (!mounted) return null

  return (
    <div className={className}>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        <div
          {...getWrapperProps()}
          onClick={() => setTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME)}
          className={slots.wrapper({
            class: ['h-8 w-8', 'flex items-center justify-center', 'bg-default-100 hover:bg-default-200 rounded-lg'],
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  )
}

export default ThemeSwitcherComponent
