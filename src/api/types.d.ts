export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface UserInfo {
  roles: string[]
  name: string
  avatar: string
}

export interface UserData {
  id: number
  username: string
  roles: string[]
  status: string
}

export interface RoleData {
  id: number
  name: string
  description: string
  permissions: string[]
  createTime: string
}

export interface ListResponse<T> {
  list: T[]
  total: number
} 