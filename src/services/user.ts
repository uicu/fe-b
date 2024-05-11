import axios, { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/v1/user/info'
  const res = (await axios.get(url)) as { data: ResDataType }
  return res.data
}
