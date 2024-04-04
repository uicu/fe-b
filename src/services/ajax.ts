import axios from 'axios'
import { USER_TOKEN, getToken } from '../utils/local-storage'

export type ResDataType = {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  message: string
}

const instance = axios.create({
  timeout: 10 * 1000,
})

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken(USER_TOKEN)}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    return Promise.reject(error.response.data)
  }
)

export default instance
