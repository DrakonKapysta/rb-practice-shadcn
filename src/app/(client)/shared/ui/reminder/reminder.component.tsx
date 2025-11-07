import { AlertCircle } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/pkg/utils/ui'

interface IProps {
  title?: string
  description?: string
  type?: 'info' | 'default'
  children?: React.ReactNode
}

const ReminderComponent: FC<Readonly<IProps>> = (props) => {
  const { title, description, type = 'default', children } = props

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        type === 'info'
          ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20'
          : 'bg-muted/50 mt-2 rounded-lg border p-3',
      )}
    >
      <div className='flex items-start gap-2'>
        <AlertCircle
          className={cn(
            'mt-0.5 shrink-0',
            type === 'info' ? 'h-5 w-5 text-blue-600 dark:text-blue-400' : 'text-muted-foreground h-4 w-4',
          )}
        />
        <div>
          {title && <h4 className='mb-1 text-sm font-medium text-blue-900 dark:text-blue-100'>{title}</h4>}
          <p className={cn('text-sm', type === 'info' ? 'text-blue-800 dark:text-blue-200' : 'text-muted-foreground')}>
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ReminderComponent
