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

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}
