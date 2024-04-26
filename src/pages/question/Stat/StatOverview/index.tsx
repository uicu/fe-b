import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import TrendLine from './components/TrendLine'
import StatMap from './components/StatMap'
import DemoPie from './components/DemoPie'

const StatOverview: FC = () => {
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Card title="回收趋势" bordered={false}>
          <TrendLine />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="地域位置" bordered={false}>
          <StatMap />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="常用设备" bordered={false}>
          <DemoPie />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="常用系统" bordered={false}>
          <DemoPie />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="渠道来源" bordered={false}>
          <DemoPie />
        </Card>
      </Col>
    </Row>
  )
}

export default StatOverview
