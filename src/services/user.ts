import axios, { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/v1/user/info'
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  email: string,
  captcha: string,
  nickName?: string
): Promise<ResDataType> {
  const url = '/v1/user/register'
  const body = { username, password, email, captcha, nickName: nickName || username }
  const res = (await axios.post(url, body)) as ResDataType
  return res.data
}

// 获取注册验证码
export async function getUserRegisterCaptchaService(email: string): Promise<ResDataType> {
  const url = '/v1/user/register/captcha'
  const res = (await axios.get(url, {
    params: {
      address: email,
    },
  })) as ResDataType
  return res.data
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/v1/user/login'
  const body = { username, password }
  const res = (await axios.post(url, body)) as ResDataType
  return res.data
}

// 获取重置密码验证码
export async function getUserUpdatePasswordCaptchaService(email: string): Promise<ResDataType> {
  const url = '/v1/user/update-password/captcha'
  const res = (await axios.get(url, {
    params: {
      address: email,
    },
  })) as ResDataType
  return res.data
}

// 重置密码
export async function updatePasswordService(
  username: string,
  password: string,
  email: string,
  captcha: string
): Promise<ResDataType> {
  const url = '/v1/user/update-password'
  const body = { username, password, email, captcha }
  const res = (await axios.post(url, body)) as ResDataType
  return res.data
}

// 获取修改用户信息验证码
export async function getUserUpdateCaptchaService(): Promise<ResDataType> {
  const url = '/v1/user/update/captcha'
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 修改用户信息
export async function updateService(
  headPic: string,
  nickName: string,
  email: string,
  captcha: string
): Promise<ResDataType> {
  const url = '/v1/user/update'
  const body = { headPic, nickName, email, captcha }
  const res = (await axios.post(url, body)) as ResDataType
  return res.data
}
