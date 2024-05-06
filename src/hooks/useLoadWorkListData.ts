import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getWorkListService } from '../services/work'
import {
  LIST_SEARCH_TITLE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant/index'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadWorkListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const title = searchParams.get(LIST_SEARCH_TITLE) || undefined
      const pageNo = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      const res = await getWorkListService({ title, isStar, isDeleted, pageNo, pageSize })
      return res.data
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadWorkListData
