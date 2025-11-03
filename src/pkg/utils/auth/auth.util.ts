import { Role } from '@/app/(client)/entities/models'

const RoleHierarchy: Record<Role, Role[]> = {
  [Role.SUPER_ADMIN]: [Role.ADMIN, Role.USER],
  [Role.ADMIN]: [Role.USER],
  [Role.USER]: [],
}

export class AuthUtil {
  static canPerformActionByRole(
    performerRole: string | undefined | null,
    targetRole: string | undefined | null,
  ): { success: boolean; roles: Role[] } {
    if (!performerRole || !targetRole) return { success: false, roles: [] }

    return {
      success: RoleHierarchy[performerRole as Role]?.includes(targetRole as Role) || false,
      roles: RoleHierarchy[performerRole as Role],
    }
  }

  static isAdmin(role: string | undefined | null) {
    return role === Role.SUPER_ADMIN || role === Role.ADMIN || false
  }
}
