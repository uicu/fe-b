import { MouseEvent } from 'react'
import { MouseSensor } from '@dnd-kit/core'

// 解决dnd-kit点击事件和拖拽事件的冲突
export class MouseSensorCustomize extends MouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        return shouldDragEvent(event.target as HTMLElement)
      },
    },
  ]
}

function shouldDragEvent(element: HTMLElement | null) {
  let current = element
  while (current) {
    if (current?.dataset?.noDrag) {
      return false
    }
    current = current.parentElement
  }
  return true
}
