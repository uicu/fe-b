import React, { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'

type PropsType = {
  children: JSX.Element | JSX.Element[] | string
  id: string
}

const Draggable: FC<PropsType> = props => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  )
}

export { Draggable }
