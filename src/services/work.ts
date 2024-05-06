import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  pageNo: number
  pageSize: number
  title?: string
  status?: string
  quantity?: string
  sort?: string
  timeSpan?: string
  channel?: string
}

// 获取单个问卷信息
export async function getWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/${id}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 创建问卷
export async function createWorkService(opt: {
  title: string
  channelId: number
  desc: string
}): Promise<ResDataType> {
  const url = '/v1/work/create'
  // 组件默认值
  const content = {
    components: [
      {
        fe_id: 'c1',
        type: 'workInfo',
        title: '问卷信息',
        page: 1,
        isHidden: false,
        isLocked: false,
        props: { title: '问卷标题', desc: '问卷描述...' },
      },
      {
        fe_id: 'c2',
        type: 'workInput',
        title: '输入框1',
        page: 1,
        isHidden: false,
        isLocked: false,
        props: { title: '你的姓名', placeholder: '请输入姓名...' },
      },
      {
        fe_id: 'c3',
        type: 'workTextarea',
        title: '多行输入',
        page: 1,
        isHidden: false,
        isLocked: false,
        props: { title: '你的爱好', placeholder: '请输入...' },
      },
      {
        fe_id: 'last',
        type: 'workInfo',
        title: '最后一页',
        page: -1,
        isHidden: false,
        isLocked: false,
        props: { title: '问卷到此结束，感谢您的参与！', desc: '问卷描述...' },
      },
    ],
    props: {},
    setting: {},
  }

  const res = (await axios.post(url, { ...opt, content })) as ResDataType
  return res.data
}

// 获取（查询）问卷列表
export async function getWorkListService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
  const url = '/v1/work'
  const res = (await axios.get(url, { params: opt })) as ResDataType
  return res.data
}

// 更新单个问卷
export async function updateWorkService(
  id: string,
  opt: Record<string, unknown>
): Promise<ResDataType> {
  const url = `/v1/work/${id}`
  const res = (await axios.patch(url, opt)) as ResDataType
  return res.data
}

// 发布问卷
export async function publishWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/publish/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 复制问卷
export async function duplicateWorkService(id: string): Promise<ResDataType> {
  const url = `/api/work/duplicate/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 批量彻底删除
export async function deleteWorkService(ids: string[]): Promise<ResDataType> {
  const url = '/api/work'
  const res = (await axios.delete(url, { data: { ids } })) as ResDataType
  return res.data
}
