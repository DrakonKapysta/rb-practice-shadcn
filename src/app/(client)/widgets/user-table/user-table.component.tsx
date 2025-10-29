'use client'

import { FC, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'

import { EditableUserFieldComponent, UserActionsComponent, UserRoleSelector, UserTablePagination } from './elements'

interface IProps {}

const UserTable: FC<Readonly<IProps>> = () => {
  const [page, setPage] = useState(1)

  const [pageSize, setPageSize] = useState(10)

  const { data } = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: async () => {
      const { data } = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      })

      return data
    },
  })

  if (!data) return <Spinner className='mx-auto h-16 w-16' />

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
            {data.users.map((user) => (
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

      <UserTablePagination page={page} pageSize={pageSize} total={data.total} onPageChange={setPage} />
    </div>
  )
}

export default UserTable
