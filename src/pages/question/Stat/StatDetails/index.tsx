import React, { FC, useState } from 'react'
import PageStat from './PageStat'
import ChartStat from './ChartStat'
import styles from './index.module.scss'

const StatDetails: FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  return (
    <>
      <div className={styles.main}>
        <div className={styles['stat-details-wrapper']}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
      </div>
      <div className={styles.right}>
        <ChartStat
          selectedComponentId={selectedComponentId}
          selectedComponentType={selectedComponentType}
        />
      </div>
    </>
  )
}

export default StatDetails
