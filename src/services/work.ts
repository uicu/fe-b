import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  pageNo: number
  pageSize: number
  title?: string
  status?: number
  quantity?: string
  sort?: string
  timeSpan?: string
  channel?: string
  offsetNum?: number
  isTemplate: boolean
  isPublic: boolean
}

// 获取单个作品信息
export async function getWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/${id}`
  const res = (await axios.get(url)) as ResDataType
  return res.data
}

// 创建作品
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
        title: '作品信息',
        page: 1,
        isHidden: false,
        isLocked: false,
        props: { title: '作品标题', desc: '作品描述...' },
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
        props: { title: '作品到此结束，感谢您的参与！', desc: '作品描述...' },
      },
    ],
    props: {},
    setting: {},
  }

  const res = (await axios.post(url, { ...opt, content })) as ResDataType
  return res.data
}

// 获取（查询）作品列表
export async function getWorkListService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
  const url = '/v1/work'
  const res = (await axios.get(url, { params: opt })) as ResDataType
  return res.data
}

// 更新单个作品
export async function updateWorkService(
  id: string,
  opt: Record<string, unknown>
): Promise<ResDataType> {
  const url = `/v1/work/${id}`
  const res = (await axios.patch(url, opt)) as ResDataType
  return res.data
}

// 发布作品
export async function publishWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/publish/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 复制作品
export async function copyWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/copy/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 删除 status=0
export async function deleteWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/${id}`
  const res = (await axios.delete(url)) as ResDataType
  return res.data
}

// 彻底删除 status=4
export async function deleteThoroughWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/thorough/${id}`
  const res = (await axios.delete(url)) as ResDataType
  return res.data
}

// 发布为模版
export async function publishTemplateWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/publish/template/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 暂停回收
export async function pauseWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/pause/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 恢复作品
export async function recoverWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/recover/${id}`
  const res = (await axios.post(url)) as ResDataType
  return res.data
}

// 个人模版移除
export async function removeTemplateWorkService(id: string): Promise<ResDataType> {
  const url = `/v1/work/remove/template/${id}`
  const res = (await axios.delete(url)) as ResDataType
  return res.data
}
