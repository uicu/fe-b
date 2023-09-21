import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
  undoComponents,
  redoComponents,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  // 当前所在的页
  const { currentPage } = useGetPageInfo()
  const { selectedId, componentList, selectedComponent, copiedComponent, isPast, isFuture } =
    useGetComponentInfo()
  const { isLocked, page: selectedPage } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0 // 第一个
  const isLast = selectedIndex + 1 >= length // 最后一个

  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  // 复制
  function copy() {
    dispatch(copySelectedComponent())
  }

  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent({ page: currentPage }))
  }

  // 上移
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // 下移
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // 撤销
  function undo() {
    dispatch(undoComponents())
  }

  // 重做
  function redo() {
    dispatch(redoComponents())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          disabled={(() => {
            // 1.必须选中
            // 2.每页至少有一个
            // 3.当前选中的必须在当前页
            const currentPageComponent = componentList.filter(item => {
              return item.page === currentPage
            })
            return !selectedId || currentPageComponent.length <= 1 || selectedPage !== currentPage
          })()}
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          disabled={(() => {
            // 1.必须选中
            return !selectedId
          })()}
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          disabled={(() => {
            // 1.必须选中
            return !selectedId
          })()}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          disabled={(() => {
            // 1.必须选中
            return !selectedId
          })()}
          shape="circle"
          icon={<CopyOutlined />}
          onClick={copy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          disabled={(() => {
            // 1.必须选中
            // 2.在第一个元素时不能上移
            // 3.在当前页第一个元素时不能上移
            // 4.当前选中的必须在当前页
            const currentPageComponent = componentList.filter(item => {
              return item.page === currentPage
            })
            const currentPageSelectedIndex = currentPageComponent.findIndex(
              c => c.fe_id === selectedId
            )
            const currentPageIsFirst = currentPageSelectedIndex <= 0
            return !selectedId || isFirst || currentPageIsFirst || selectedPage !== currentPage
          })()}
          shape="circle"
          icon={<UpOutlined />}
          onClick={moveUp}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          disabled={(() => {
            // 1.必须选中
            // 2.在最后一个元素时不能下移
            // 3.在当前最后一个元素时不能下移
            // 4.当前选中的必须在当前页
            const currentPageComponent = componentList.filter(item => {
              return item.page === currentPage
            })

            const currentPageSelectedIndex = currentPageComponent.findIndex(
              c => c.fe_id === selectedId
            )
            const currentPageIsLast = currentPageSelectedIndex + 1 >= currentPageComponent.length
            return !selectedId || isLast || currentPageIsLast || selectedPage !== currentPage
          })()}
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button disabled={!isPast} shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button disabled={!isFuture} shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
