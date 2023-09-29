import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { Pagination, Divider, Dropdown, Button, message } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import {
  pushPast,
  changeSelectedId,
  replaceComponent,
  changeCurrentPage,
  changePageTotal,
} from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './CanvasTool.module.scss'

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

const CanvasTool: FC = () => {
  const [items, setItems] = useState<Array<{ key: string; label: string }>>(itemsConfig)
  const { componentList, pageTotal, currentPage } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 切换页码
  const onChange = (page: number) => {
    dispatch(pushPast())
    dispatch(changeCurrentPage(page))
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))
  }

  const onClick: MenuProps['onClick'] = e => {
    dispatch(pushPast())
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))
    // 删除
    if (e.key === '1') {
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
    if (e.key === '2') {
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
    if (e.key === '3') {
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
    if (e.key === '4') {
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
    if (e.key === '5') {
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
  }

  useEffect(() => {
    // 重置成全部
    setItems(itemsConfig)
    let newItems = itemsConfig
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
        return item.key !== '4'
      })
    }

    setItems(newItems)
  }, [pageTotal, currentPage])

  return (
    <div className={styles.tool}>
      <Pagination
        size="small"
        showLessItems
        current={currentPage}
        onChange={onChange}
        total={pageTotal}
        defaultPageSize={1}
      />
      <Divider type="vertical" />
      <Button
        size="small"
        type={currentPage === -1 ? 'link' : 'text'}
        onClick={() => {
          onChange(-1)
        }}
      >
        结束页
      </Button>
      <Divider type="vertical" />
      <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
        <MoreOutlined />
      </Dropdown>
    </div>
  )
}

export default CanvasTool
