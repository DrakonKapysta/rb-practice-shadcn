'use client'

import { FC, useState } from 'react'
import { toast } from 'sonner'

import { useQuery } from '@tanstack/react-query'

import { adminUsersQueryOptions } from '@/app/(client)/entities/api'
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/(client)/shared/ui'

import { EditableUserFieldComponent, UserActionsComponent, UserRoleSelector, UserTablePagination } from './elements'

interface IProps {}

const UserTable: FC<Readonly<IProps>> = () => {
  const [page, setPage] = useState(1)

  const [pageSize, setPageSize] = useState(10)

  const {
    data: result,
    error,
    isLoading,
  } = useQuery(
    adminUsersQueryOptions({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sortBy: 'createdAt',
    }),
  )

  if (isLoading) return <Spinner className='mx-auto h-10 w-10' />

  if (!result?.success || error)
    return <div className='text-center text-red-500'>{result?.error?.message || 'Something went wrong'}</div>

  if (!result.data?.users?.length) return <div className='text-center text-red-500'>No data found</div>

  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Email</TableHead>

              <TableHead>Role</TableHead>

              <TableHead>Verified</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Joined</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result.data.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <EditableUserFieldComponent field='name' userId={user.id} defaultValue={user.name} />
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <UserRoleSelector userId={user.id} defaultValue={user.role || 'unknown'} />
                </TableCell>

                <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>

                <TableCell>
                  {user.banned ? (
                    <span className='text-red-500'>Banned</span>
                  ) : (
                    <span className='text-green-500'>Active</span>
                  )}
                </TableCell>

                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>

                <TableCell>
                  <UserActionsComponent user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserTablePagination page={page} pageSize={pageSize} total={result.data.total} onPageChange={setPage} />
    </div>
  )
}

export default UserTable
