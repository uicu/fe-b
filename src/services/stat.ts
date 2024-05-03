import axios, { ResDataType } from './ajax'

// 获取问卷的统计列表
export async function getQuestionStatListService(
  questionId: string,
  opt: { pageNo: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/v1/stat/${questionId}`
  const res = (await axios.get(url, { params: opt })) as ResDataType
  return res.data
}

//回收趋势
export async function getQuestionStatTrendService(questionId: string): Promise<ResDataType> {
  const url = `/v1/stat/trend/${questionId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//常用系统
export async function getQuestionStatOsService(questionId: string): Promise<ResDataType> {
  const url = `/v1/stat/os/${questionId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//常用系统
export async function getQuestionStatDeviceService(questionId: string): Promise<ResDataType> {
  const url = `/v1/stat/device/${questionId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//地域位置
export async function getQuestionStatLocationService(questionId: string): Promise<ResDataType> {
  const url = `/v1/stat/location/${questionId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

//平均完成时间
export async function getQuestionStatAverageTimeService(questionId: string): Promise<ResDataType> {
  const url = `/v1/stat/average/time/${questionId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 导出
export async function exportAnswer(questionId: string): Promise<ArrayBuffer> {
  const url = `/v1/stat/export/${questionId}`
  const res = (await axios.get(url, {
    responseType: 'arraybuffer',
  })) as { data: ArrayBuffer }
  return res.data
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}
