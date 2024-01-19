import React, { useEffect, useRef } from 'react'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import UserTask from './UserTaskNode'
import styles from './index.module.scss'

function App() {
  const refContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const lf = new LogicFlow({
      container: refContainer.current as HTMLDivElement,
      grid: true,
    })
    lf.register(UserTask)

    lf.render({
      nodes: [
        {
          id: 'node_id_1',
          type: 'UserTask',
          x: 100,
          y: 100,
          text: { x: 100, y: 100, value: '节点1' },
          properties: {
            statu: 'pass',
          },
        },
        {
          id: 'node_id_2',
          type: 'circle',
          x: 200,
          y: 300,
          text: { x: 300, y: 300, value: '节点2' },
          properties: {},
        },
      ],
      edges: [
        {
          id: 'edge_id',
          type: 'polyline',
          sourceNodeId: 'node_id_1',
          targetNodeId: 'node_id_2',
          text: { x: 139, y: 200, value: '连线' },
          startPoint: { x: 100, y: 140 },
          endPoint: { x: 200, y: 250 },
          pointsList: [
            { x: 100, y: 140 },
            { x: 100, y: 200 },
            { x: 200, y: 200 },
            { x: 200, y: 250 },
          ],
          properties: {},
        },
      ],
    })
  })

  return (
    <div ref={refContainer} className={styles.canvas}>
      画布
    </div>
  )
}

export default App
