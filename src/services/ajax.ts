import Cookie from 'js-cookie'
import axios from 'axios'

export type ResDataType = {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  message: string
}

const axiosInstance = axios.create({
  timeout: 30 * 1000,
  baseURL: 'http://localhost:8888',
})

// request 拦截：每次请求都带上 token
axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${Cookie.get('USER_TOKEN')}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

// response 拦截
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    // 网络错误
    if (error?.code === 'ERR_NETWORK') {
      return Promise.reject({
        code: 500,
        message: 'fail',
        data: '',
      })
    }
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
  if (!Cookie.get('REFRESH_USER_TOKEN')) return
  const res = await axiosInstance.get('/v1/user/refresh', {
    params: {
      refreshToken: Cookie.get('REFRESH_USER_TOKEN'),
    },
  })
  const { accessToken = '', refreshToken = '' } = res.data.data
  Cookie.set('USER_TOKEN', accessToken)
  Cookie.set('REFRESH_USER_TOKEN', refreshToken)
  return res
}

export default axiosInstance
