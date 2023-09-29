import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Pagination, Divider, Dropdown, Button, message } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { pushPast, changeSelectedId, changeCurrentPage } from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useChangeComponentInfo from '../../../hooks/useChangeComponentInfo'
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
  const { pageTotal, currentPage } = useGetComponentInfo()
  const { onDel, onMoveForward, onMoveBack, onCopy, onAdd } = useChangeComponentInfo()
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

    if (e.key === '1') {
      onDel()
    }

    if (e.key === '2') {
      onMoveForward()
    }

    if (e.key === '3') {
      onMoveBack()
    }

    if (e.key === '4') {
      onCopy()
    }

    if (e.key === '5') {
      onAdd()
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
