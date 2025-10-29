'use client'

import { FC } from 'react'

import { Button } from '@/app/(client)/shared/ui'

interface IProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

const UserTablePagination: FC<Readonly<IProps>> = (props) => {
  const { page, pageSize, total, onPageChange } = props

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className='flex w-full items-center justify-between p-2'>
      <div className='text-sm text-gray-500'>
        {page} page of {totalPages}
      </div>

      <div className='flex gap-2'>
        <Button variant='outline' onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </Button>

        <Button variant='outline' onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default UserTablePagination
