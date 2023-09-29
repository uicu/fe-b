import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Pagination, Divider, Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { pushPast, changeSelectedId, changeCurrentPage } from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useChangeComponentInfo from '../../../hooks/useChangeComponentInfo'
import styles from './CanvasTool.module.scss'

const CanvasTool: FC = () => {
  const { pageTotal, currentPage } = useGetComponentInfo()
  const { onDel, onMoveForward, onMoveBack, onCopy, onAdd, getConfigList } =
    useChangeComponentInfo()
  const dispatch = useDispatch()

  const menuItems = getConfigList(currentPage)

  // 切换页码
  const onChange = (page: number) => {
    dispatch(pushPast())
    dispatch(changeCurrentPage(page))
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))
  }

  const onMenuClick: MenuProps['onClick'] = e => {
    dispatch(pushPast())
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))

    if (e.key === '1') {
      onDel(currentPage)
    }

    if (e.key === '2') {
      onMoveForward(currentPage)
    }

    if (e.key === '3') {
      onMoveBack(currentPage)
    }

    if (e.key === '4') {
      onCopy(currentPage)
    }

    if (e.key === '5') {
      onAdd(currentPage)
    }
  }

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
      <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} placement="bottom" arrow>
        <MoreOutlined />
      </Dropdown>
    </div>
  )
}

export default CanvasTool
