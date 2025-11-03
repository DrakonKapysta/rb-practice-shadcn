import { Computer, SmartphoneIcon, Tablet } from 'lucide-react'

import { AuthUtil } from '@/pkg/utils/auth'

export function getDeviceIcon(userAgent?: string | null) {
  const type = AuthUtil.detectDeviceType(userAgent || '')

  switch (type) {
    case 'mobile':
      return <SmartphoneIcon className='h-5 w-5 text-blue-500' />
    case 'tablet':
      return <Tablet className='h-5 w-5 text-purple-500' />
    case 'desktop':
      return <Computer className='h-5 w-5 text-green-500' />
    default:
      return <Computer className='h-5 w-5 text-gray-400' />
  }
}
