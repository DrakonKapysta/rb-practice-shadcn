import { headers } from 'next/headers'
import { FC } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/(client)/shared/ui'
import { auth } from '@/pkg/integrations/better-auth'

import { UserActionsComponent } from './elements'

interface IProps {}

const UserTable: FC<Readonly<IProps>> = async () => {
  const { users } = await auth.api.listUsers({
    query: {
      limit: 10,
      offset: 0,
    },
    headers: await headers(),
  })

  return (
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.role}</TableCell>

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
  )
}

export default UserTable
