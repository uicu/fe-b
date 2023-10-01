import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { message } from 'antd'
import { replaceComponent, changeCurrentPage, changePageTotal } from '../store/componentsReducer'
import useGetComponentInfo from './useGetComponentInfo'

const itemsConfig = [
  {
    key: '1',
    label: '删除',
  },
  {
    key: '2',
    label: '前移',
  },
  {
    key: '3',
    label: '后移',
  },
  {
    key: '4',
    label: '复制',
  },
  {
    key: '5',
    label: '新增',
  },
]

function useChangeComponentInfo() {
  const dispatch = useDispatch()
  const { componentList, pageTotal } = useGetComponentInfo()

  const getConfigList = (currentPage: number) => {
    let newItems: Array<{ key: string; label: string }> = itemsConfig
    // 删除不要的场景
    if (pageTotal <= 1 || currentPage === -1) {
      newItems = newItems.filter(item => {
        return item.key !== '1'
      })
    }

    // 前移不要的场景
    if (currentPage === 1 || currentPage === -1) {
      newItems = newItems.filter(item => {
        return item.key !== '2'
      })
    }

    // 后移不要的场景
    if (currentPage === pageTotal || currentPage === -1) {
      newItems = newItems.filter(item => {
        return item.key !== '3'
      })
    }

    // 复制不要的场景
    if (currentPage === -1) {
      newItems = newItems.filter(item => {
        return item.key !== '4' && item.key !== '5'
      })
    }
    return newItems
  }

  // 删除
  const onDel = (currentPage: number) => {
    if (pageTotal <= 1 || currentPage === -1) return message.error('不允许删除')

    // 筛选出非当前页的
    let newComponent = componentList.filter(item => {
      return item.page !== currentPage
    })
    // 在当前页以后的往前挪一位
    newComponent = newComponent.map(item => {
      if (item.page > currentPage) {
        return {
          ...item,
          page: item.page - 1,
        }
      }
      return {
        ...item,
      }
    })

    dispatch(replaceComponent(newComponent))
    dispatch(changePageTotal(pageTotal - 1))

    if (currentPage !== 1) {
      dispatch(changeCurrentPage(currentPage - 1))
    }
  }

  // 前移
  const onMoveForward = (currentPage: number) => {
    if (currentPage === 1 || currentPage === -1) return message.error('不允许前移')
    const newComponent = componentList.map(item => {
      if (item.page === currentPage) {
        return {
          ...item,
          page: item.page - 1,
        }
      }
      if (item.page === currentPage - 1) {
        return {
          ...item,
          page: currentPage,
        }
      }
      return {
        ...item,
      }
    })
    dispatch(replaceComponent(newComponent))

    if (currentPage !== 1) {
      dispatch(changeCurrentPage(currentPage - 1))
    }
  }

  // 后移
  const onMoveBack = (currentPage: number) => {
    if (currentPage === pageTotal || currentPage === -1) return message.error('不允许后移')
    const newComponent = componentList.map(item => {
      if (item.page === currentPage) {
        return {
          ...item,
          page: item.page + 1,
        }
      }
      if (item.page === currentPage + 1) {
        return {
          ...item,
          page: currentPage,
        }
      }
      return {
        ...item,
      }
    })
    dispatch(replaceComponent(newComponent))

    if (currentPage !== pageTotal) {
      dispatch(changeCurrentPage(currentPage + 1))
    }
  }
  // 复制
  const onCopy = (currentPage: number) => {
    // 找到当前页的所有组件
    let currentComponent = componentList.filter(item => {
      return item.page === currentPage
    })
    // 替换id
    currentComponent = currentComponent.map(item => {
      return {
        ...item,
        fe_id: nanoid(),
        page: currentPage + 1,
      }
    })
    // 找到要插入的index
    const currentIndex = componentList.findIndex(item => {
      return item.page === currentPage + 1
    })
    // 在当前位置之后的index往后移
    const newComponent = componentList.map(item => {
      if (item.page > currentPage) {
        return {
          ...item,
          page: item.page + 1,
        }
      }
      return {
        ...item,
      }
    })
    newComponent.splice(currentIndex, 0, ...currentComponent)
    dispatch(replaceComponent(newComponent))
    dispatch(changePageTotal(pageTotal + 1))
    dispatch(changeCurrentPage(currentPage + 1))
  }

  // 新增
  const onAdd = (currentPage: number) => {
    // 当前要插入的足迹
    const currentComponent = [
      {
        fe_id: nanoid(), // 前端生成的 id
        type: 'questionInput', // 要和后端统一好
        title: '单行输入',
        page: currentPage + 1,
        isHidden: false,
        isLocked: false,
        props: {
          title: '输入框标题',
          placeholder: '请输入...',
        },
      },
    ]

    // 找到要插入的index
    const currentIndex = componentList.findIndex(item => {
      return item.page === currentPage + 1
    })
    // 在当前位置之后的index往后移
    const newComponent = componentList.map(item => {
      if (item.page > currentPage) {
        return {
          ...item,
          page: item.page + 1,
        }
      }
      return {
        ...item,
      }
    })
    newComponent.splice(currentIndex, 0, ...currentComponent)
    dispatch(replaceComponent(newComponent))
    dispatch(changePageTotal(pageTotal + 1))
    dispatch(changeCurrentPage(currentPage + 1))
  }

  return {
    onDel,
    onMoveForward,
    onMoveBack,
    onCopy,
    onAdd,
    getConfigList,
  }
}

export default useChangeComponentInfo
