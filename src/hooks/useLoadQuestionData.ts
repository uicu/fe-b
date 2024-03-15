import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { sortBy } from 'lodash-es'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const res = await getQuestionService(id)
      return res.data
    },
    {
      manual: true,
    }
  )

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return

    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      pageTotal = 1,
      componentList = [],
    } = data

    const _componentList = sortBy(componentList, ['page'])

    // 获取默认的 selectedId
    let selectedId = ''
    if (_componentList.length > 0) {
      // 默认选中第一页的第一个组件
      const firstComponent = _componentList.find(item => {
        return item.page === 1
      })
      selectedId = firstComponent.fe_id
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(
      resetComponents({
        // 拿到后端数据根据page先排序一下
        componentList: _componentList,
        selectedId,
        copiedComponent: null,
        pageTotal,
        currentPage: 1,
      })
    )

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
