import axios, { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/v1/user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  email: string,
  captcha: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/v1/user/register'
  const body = { username, password, email, captcha, nickName: nickname || username }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}

// 获取注册验证码
export async function getUserRegisterCaptchaService(email: string): Promise<ResDataType> {
  const url = '/v1/user/register-captcha'
  const data = (await axios.get(url, {
    params: {
      address: email,
    },
  })) as ResDataType
  return data
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/v1/user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
