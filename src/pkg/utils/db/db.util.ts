import { PgSelect } from 'drizzle-orm/pg-core'

export const withPagination = <T extends PgSelect>(query: T, page: number = 1, pageSize: number = 10) => {
  const offset = (page - 1) * pageSize

  return query.limit(pageSize).offset(offset)
}
