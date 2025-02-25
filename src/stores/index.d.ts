import type { UserState } from './user'
import type { AppState } from './app'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    user: UserState
    app: AppState
  }
} 