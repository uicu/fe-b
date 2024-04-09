import axios from 'axios'
import {
  USER_TOKEN,
  REFRESH_USER_TOKEN,
  USER_INFO,
  setToken,
  getToken,
} from '../utils/local-storage'

export type ResDataType = {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  message: string
}

const axiosInstance = axios.create({
  timeout: 10 * 1000,
})

// request 拦截：每次请求都带上 token
axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken(USER_TOKEN)}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 msg
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const { data, config } = error.response

    if (data.code === 401 && !config.url.includes('/v1/user/refresh')) {
      const res = await refreshToken()
      if (res && res.status === 200) {
        return axiosInstance(config)
      } else {
        return Promise.reject(error.response.data)
      }
    }
    return Promise.reject(error.response.data)
  }
)

async function refreshToken() {
  if (!getToken(REFRESH_USER_TOKEN)) return
  const res = await axiosInstance.get('/v1/user/refresh', {
    params: {
      refreshToken: getToken(REFRESH_USER_TOKEN),
    },
  })

  const { accessToken = '', refreshToken = '', userInfo = {} } = res.data.data
  setToken(USER_TOKEN, accessToken)
  setToken(REFRESH_USER_TOKEN, refreshToken)
  setToken(USER_INFO, JSON.stringify(userInfo))
  return res
}

export default axiosInstance
