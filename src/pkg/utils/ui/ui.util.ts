import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCharacterStatusColorUtil(status: string) {
  switch (status) {
    case 'Alive':
      return 'text-green-500'
    case 'Dead':
      return 'text-red-500'
    case 'Unknown':
      return 'text-gray-500'
  }
}
