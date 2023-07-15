import React, { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'

type PropsType = {
  children: JSX.Element | JSX.Element[] | string
  id: string
}

const Droppable: FC<PropsType> = props => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export { Droppable }
