import React, { useState, useRef } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

export const TRASH_ID = 'void'

function App() {
  const [items, setItems] = useState<any>(() => {
    return {
      A: ['A1', 'A2', 'A3'],
      B: ['B1', 'B2', 'B3'],
      C: ['C1', 'C2', 'C3'],
      D: ['D1', 'D2', 'D3'],
    }
  })
  const [containers] = useState(Object.keys(items))

  const [clonedItems, setClonedItems] = useState<any>(null)

  const findContainer = (id: any) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find(key => items[key].includes(id))
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems)
    }
    setClonedItems(null)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => {
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        console.log(active, over, 'onDragOver')

        const overId = over?.id

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return
        }

        const overContainer = findContainer(overId)
        const activeContainer = findContainer(active.id)

        if (!overContainer || !activeContainer) {
          return
        }

        if (activeContainer !== overContainer) {
          setItems((items: any) => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems.indexOf(overId)
            const activeIndex = activeItems.indexOf(active.id)

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
              [activeContainer]: items[activeContainer].filter((item: any) => item !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length),
              ],
            }
          })
        }
      }}
      onDragEnd={({ active, over }: any) => {
        console.log(active, over, 'onDragEnd')
        const activeContainer = findContainer(active.id)

        const overId = over?.id

        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id)
          const overIndex = items[overContainer].indexOf(overId)

          if (activeIndex !== overIndex) {
            setItems((items: any) => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
            }))
          }
        }
      }}
      onDragCancel={onDragCancel}
    >
      {/* <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(id => (
          <SortableItem key={id} id={id}>
            <p style={{ margin: '30px', backgroundColor: '#ff3300' }}>{id}</p>
          </SortableItem>
        ))}
      </SortableContext> */}
      {containers.map(containerId => {
        return (
          <SortableContext
            key={containerId}
            items={items[containerId]}
            strategy={verticalListSortingStrategy}
          >
            {containerId}
            {items[containerId].map((value: any) => {
              return (
                <SortableItem key={value} id={value}>
                  <p style={{ margin: '30px', backgroundColor: '#ff3300' }}>{value}</p>
                </SortableItem>
              )
            })}
          </SortableContext>
        )
      })}
    </DndContext>
  )
}

export default App
