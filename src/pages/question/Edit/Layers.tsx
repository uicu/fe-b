import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import cloneDeep from 'lodash.clonedeep'
import classNames from 'classnames'
import { message, Input, Button, Space, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { EyeInvisibleOutlined, LockOutlined, MoreOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from '../../../components/DragSortable/SortableItem'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  pushPast,
  ComponentInfoType,
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLocked,
  changeComponentHidden,
  replaceComponent,
  changeCurrentPage,
} from '../../../store/componentsReducer'
import useChangeComponentInfo from '../../../hooks/useChangeComponentInfo'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import styles from './Layers.module.scss'

export const TRASH_ID = 'void'

const Layers: FC = () => {
  const { componentList, selectedId, currentPage } = useGetComponentInfo()
  const { onDel, onMoveForward, onMoveBack, onCopy, onAdd, getConfigList } =
    useChangeComponentInfo()
  const dispatch = useDispatch()

  // 记录当前正在操作的page
  const [currentMenuIndex, setCurrentMenuIndex] = useState(currentPage)

  const menuItems = getConfigList(currentMenuIndex)

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  const onMenuClick: MenuProps['onClick'] = e => {
    dispatch(pushPast())
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))

    if (e.key === '1') {
      onDel(currentMenuIndex)
    }

    if (e.key === '2') {
      onMoveForward(currentMenuIndex)
    }

    if (e.key === '3') {
      onMoveBack(currentMenuIndex)
    }

    if (e.key === '4') {
      onCopy(currentMenuIndex)
    }

    if (e.key === '5') {
      onAdd(currentMenuIndex)
    }
  }

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    dispatch(pushPast())
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    if (curComp) {
      // 定位到分页
      const { page } = curComp
      dispatch(changeCurrentPage(page))
    }

    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(pushPast())
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(pushPast())
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(pushPast())
    dispatch(toggleComponentLocked({ fe_id }))
  }

  // 构造分组模式
  const [items, setItems] = useState<{ [key: string]: Array<string> }>({})
  const [containers, setContainers] = useState<Array<string>>([])
  const [statDrag, setStatDrag] = useState<number>(0)
  useEffect(() => {
    // store中已经从远端拿到componentList数据 并且还未构造过分组
    if (componentList.length > 0 && containers.length !== componentList.length) {
      const _items: { [key: string]: Array<string> } = {}
      componentList.forEach((item: ComponentInfoType) => {
        if (item.page !== -1) {
          if (!_items[`${item.page}`]) {
            _items[`${item.page}`] = [item.fe_id]
          } else {
            _items[`${item.page}`].push(item.fe_id)
          }
        }
      })
      setItems(_items)
      setContainers(Object.keys(_items))
    }
  }, [componentList])

  const [clonedItems, setClonedItems] = useState<{ [key: string]: Array<string> } | null>(null)

  const findContainer = (id: string) => {
    if (id in items) {
      return id
    }
    return Object.keys(items).find(key => items[key].includes(id))
  }

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems)
    }
    setClonedItems(null)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px
      },
    })
  )

  // 拖拽排序结束
  useEffect(() => {
    if (JSON.stringify(items) === '{}') return
    let newComponent: Array<ComponentInfoType> = []
    Object.keys(items).forEach((key: string) => {
      const pages = items[key].map(item => {
        const component = componentList.find(c => {
          return c.fe_id === item
        })
        const cloneComponent = cloneDeep(component)
        // 修改页码
        if (cloneComponent) {
          cloneComponent.page = Number(key)
        }
        return cloneComponent
      })
      newComponent = newComponent.concat(pages as Array<ComponentInfoType>)
    })
    // 更新store
    dispatch(pushPast())
    dispatch(replaceComponent(newComponent))
  }, [statDrag])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => {
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id
        if (overId == null || overId === TRASH_ID || active.id in items) {
          return
        }
        const overContainer = findContainer(overId as string)
        const activeContainer = findContainer(active.id as string)

        if (!overContainer || !activeContainer) {
          return
        }

        // 只有一条时，禁止拖拽
        if (items[activeContainer].length <= 1) {
          return
        }

        if (activeContainer !== overContainer) {
          setItems((items: { [key: string]: Array<string> }) => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems.indexOf(overId as string)
            const activeIndex = activeItems.indexOf(active.id as string)
            let newIndex: number
            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
              const modifier = isBelowOverItem ? 1 : 0
              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }
            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item: string) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length),
              ],
            }
          })
          setStatDrag(statDrag + 1)
        }
      }}
      onDragEnd={({ active, over }: DragEndEvent) => {
        const activeContainer = findContainer(active.id as string)
        const overId = over?.id
        const overContainer = findContainer(overId as string)

        if (overContainer) {
          const activeIndex = items[activeContainer as string].indexOf(active.id as string)
          const overIndex = items[overContainer].indexOf(overId as string)
          if (activeIndex !== overIndex) {
            setItems((items: { [key: string]: Array<string> }) => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
            }))
            setStatDrag(statDrag + 1)
          }
        }
      }}
      onDragCancel={onDragCancel}
    >
      {containers.map(containerId => {
        return (
          <SortableContext
            key={containerId}
            items={items[containerId]}
            strategy={verticalListSortingStrategy}
          >
            <div className={styles['page-title']}>
              <h3>第{containerId}页</h3>
              <Dropdown
                menu={{ items: menuItems, onClick: onMenuClick }}
                onOpenChange={() => {
                  setCurrentMenuIndex(Number(containerId))
                }}
                placement="bottom"
                trigger={['click']}
                arrow
              >
                <MoreOutlined />
              </Dropdown>
            </div>
            {items[containerId].map((value: string) => {
              const c: ComponentInfoType | undefined = componentList.find(item => {
                return item.fe_id === value
              })
              if (!c) return
              const { fe_id, title, isHidden, isLocked } = c
              // 拼接 title className
              const titleDefaultClassName = styles.title
              const selectedClassName = styles.selected
              const titleClassName = classNames({
                [titleDefaultClassName]: true,
                [selectedClassName]: fe_id === selectedId,
              })
              return (
                <SortableItem key={fe_id} id={fe_id}>
                  <div className={styles.wrapper}>
                    <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                      {fe_id === changingTitleId && (
                        <Input
                          value={title}
                          onChange={changeTitle}
                          onPressEnter={() => setChangingTitleId('')}
                          onBlur={() => setChangingTitleId('')}
                        />
                      )}
                      {fe_id !== changingTitleId && title}
                    </div>
                    <div className={styles.handler}>
                      <Space>
                        <Button
                          size="small"
                          shape="circle"
                          className={!isHidden ? styles.btn : ''}
                          icon={<EyeInvisibleOutlined />}
                          type={isHidden ? 'primary' : 'text'}
                          onClick={() => changeHidden(fe_id, !isHidden)}
                        />
                        <Button
                          size="small"
                          shape="circle"
                          className={!isLocked ? styles.btn : ''}
                          icon={<LockOutlined />}
                          type={isLocked ? 'primary' : 'text'}
                          onClick={() => changeLocked(fe_id)}
                        />
                      </Space>
                    </div>
                  </div>
                </SortableItem>
              )
            })}
          </SortableContext>
        )
      })}
    </DndContext>
  )
}

export default Layers
