/**
 * @description 本地存储/获取
 */

export const USER_TOKEN = 'USER_TOKEN'
export const REFRESH_USER_TOKEN = 'REFRESH_USER_TOKEN'
export const USER_INFO = 'USER_INFO'

export function setToken(key: string, token: string) {
  localStorage.setItem(key, token)
}

export function getToken(key: string) {
  return localStorage.getItem(key) || ''
}

export function removeToken(key: string) {
  localStorage.removeItem(key)
}
