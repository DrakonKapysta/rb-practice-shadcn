export class AccountBasicInfoService {
  static normalizeEmptyToNull<T extends Record<string, unknown>>(obj: T): T {
    const normalized = { ...obj }

    for (const key in normalized) {
      if (normalized[key] === '') {
        normalized[key] = null as T[Extract<keyof T, string>]
      }
    }

    return normalized
  }
}
