import React, { FC, useState } from 'react'
import { Col, Row, Drawer } from 'antd'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const StatDetails: FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  const onClose = () => {
    setSelectedComponentId('')
  }
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </Col>
      </Row>
      <Drawer title="图表统计" onClose={onClose} open={!!selectedComponentId} destroyOnClose>
        <ChartStat
          selectedComponentId={selectedComponentId}
          selectedComponentType={selectedComponentType}
        />
      </Drawer>
    </>
  )
}

export default StatDetails
