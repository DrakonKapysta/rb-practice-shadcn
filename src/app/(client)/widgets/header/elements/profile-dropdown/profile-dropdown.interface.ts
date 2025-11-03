export interface Profile {
  name: string
  email: string
  avatar: string
  subscription?: string
}

export interface MenuItem {
  label: string
  value?: string
  href: string
  icon: React.ReactNode
  external?: boolean
}
