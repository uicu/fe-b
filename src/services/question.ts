import axios, { ResDataType } from './ajax'
// import type { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const res = (await axios.get(url, { params: opt })) as ResDataType
  return res.data
}

// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const res = (await axios.patch(url, opt)) as ResDataType
  return res.data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 批量彻底删除
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question'
  const res = (await axios.delete(url, { data: { ids } })) as ResDataType
  return res.data
}
