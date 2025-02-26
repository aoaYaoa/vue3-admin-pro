import type { UserInfo } from '@/api/types'

declare global {
  interface Window {
    __APP_INFO__: {
      version: string
    }
  }
} 