import axios, { ResDataType } from './ajax'

// 获取渠道列表
export async function getChannelList(): Promise<ResDataType> {
  const url = '/v1/channel'
  const res = (await axios.get(url)) as ResDataType
  return res.data
}
