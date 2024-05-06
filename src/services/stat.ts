import axios, { ResDataType } from './ajax'

// 获取问卷的统计列表
export async function getWorkStatListService(
  workId: string,
  opt: { pageNo: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/v1/stat/${workId}`
  const res = (await axios.get(url, { params: opt })) as ResDataType
  return res.data
}

//回收趋势
export async function getWorkStatTrendService(workId: string): Promise<ResDataType> {
  const url = `/v1/stat/trend/${workId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//常用系统
export async function getWorkStatOsService(workId: string): Promise<ResDataType> {
  const url = `/v1/stat/os/${workId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//常用系统
export async function getWorkStatDeviceService(workId: string): Promise<ResDataType> {
  const url = `/v1/stat/device/${workId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//地域位置
export async function getWorkStatLocationService(workId: string): Promise<ResDataType> {
  const url = `/v1/stat/location/${workId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//平均完成时间
export async function getWorkStatAverageTimeService(workId: string): Promise<ResDataType> {
  const url = `/v1/stat/average/time/${workId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 导出
export async function exportAnswerOrTemplate(
  workId: string,
  type: 'answer' | 'template'
): Promise<ArrayBuffer> {
  const url = `/v1/stat/export/${workId}`
  const res = (await axios.get(url, {
    params: {
      type,
    },
    responseType: 'arraybuffer',
  })) as { data: ArrayBuffer }
  return res.data
}

// 批量删除答案
export async function deleteAnswers(workId: string, answerIds: number[]): Promise<ResDataType> {
  const url = `/v1/stat/delete/answers/${workId}`
  const res = (await axios.delete(url, { data: { answerIds } })) as ResDataType
  return res.data
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  workId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${workId}/${componentId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}
