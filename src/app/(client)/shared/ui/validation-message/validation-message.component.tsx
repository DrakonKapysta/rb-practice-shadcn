import { AlertCircle, CheckCircle2, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/pkg/utils/ui'

interface IProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  icon?: React.ReactNode
}

const ICON_MAP = {
  success: <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400' />,
  error: <AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400' />,
  warning: <TriangleAlertIcon className='mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400' />,
  info: <InfoIcon className='mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400' />,
}

const TEXT_COLOR_MAP = {
  success: 'text-green-800 dark:text-green-300',
  error: 'text-red-800 dark:text-red-300',
  warning: 'text-amber-800 dark:text-amber-300',
  info: 'text-blue-800 dark:text-blue-300',
}

const BORDER_COLOR_MAP = {
  success: 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20',
  error: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20',
  warning: 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20',
  info: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20',
}

const ValidationMessageComponent: FC<Readonly<IProps>> = (props) => {
  const { type, message, icon } = props

  return (
    <div className={cn('mt-4 rounded-lg border p-3', BORDER_COLOR_MAP[type])}>
      <div className='flex items-start gap-2'>
        {icon || ICON_MAP[type]}
        <p className={cn('text-sm', TEXT_COLOR_MAP[type])}>{message}</p>
      </div>
    </div>
  )
}

export default ValidationMessageComponent
