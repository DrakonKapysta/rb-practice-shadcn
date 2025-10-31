import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, userAc } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  admin: ['ban', 'impersonate', 'delete', 'set-password', 'update', 'set-role', 'get', 'list'],
  super_admin: ['get', 'list'],
} as const

export const accessControl = createAccessControl(statement)

export const user = accessControl.newRole({
  ...userAc.statements,
})

export const admin = accessControl.newRole({
  user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password', 'get', 'update'],
  admin: ['get', 'list'],
  super_admin: ['get'],
})

export const super_admin = accessControl.newRole({
  admin: ['ban', 'impersonate', 'delete', 'set-password', 'update', 'set-role', 'get', 'list'],
  user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password', 'get', 'update'],
  session: ['list', 'revoke', 'delete'],
})
