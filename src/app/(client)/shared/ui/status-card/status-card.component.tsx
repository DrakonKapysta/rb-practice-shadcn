import { MessageSquare } from 'lucide-react'
import { FC } from 'react'

import { Card, CardContent, CardHeader, Spinner } from '@/app/(client)/shared/ui'

interface IProps {
  errorMessage?: string
  showLoader?: boolean
  statusTitle: string
}

const StatusCardComponent: FC<Readonly<IProps>> = (props) => {
  const { errorMessage, statusTitle, showLoader } = props

  return (
    <Card className='text-secondary-500'>
      <CardHeader>
        <h3 className='flex items-center gap-2 text-xl font-semibold'>
          <MessageSquare className='h-5 w-5' />

          <span className='text-default-500'>{statusTitle}</span>
        </h3>
      </CardHeader>

      <CardContent>
        {showLoader ? <Spinner /> : errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </CardContent>
    </Card>
  )
}

export default StatusCardComponent
