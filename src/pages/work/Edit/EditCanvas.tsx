import React, { FC, MouseEvent, useEffect } from 'react'
import { Skeleton } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/WorkComponents/index'
import {
  pushPast,
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props, fe_id } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} fe_id={fe_id} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId, currentPage } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
    dispatch(changeEditorSelectedId(''))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  // 分页切换时，自动滚动到已选择的组件
  useEffect(() => {
    const wrapperKeyClassName = `component-key-${selectedId}`
    const anchorElement = document.getElementById(wrapperKeyClassName)
    if (anchorElement) {
      anchorElement.scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start', // 上边框与视窗顶部平齐
      })
    }
  }, [currentPage, selectedId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <Skeleton active />
      </div>
    )
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(pushPast())
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => {
            // 被隐藏或者不属于当前页则不渲染
            return !c.isHidden && c.page === currentPage
          })
          .map(c => {
            const { fe_id, isLocked } = c

            // 拼接 class name
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
              'py-3 px-6 lg:px-14': true,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  id={`component-key-${fe_id}`}
                  onClick={e => handleClick(e, fe_id)}
                >
                  <div data-no-drag="true">{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
