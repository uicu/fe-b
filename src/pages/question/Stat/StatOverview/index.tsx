import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import TrendLine from './components/TrendLine'

const StatOverview: FC = () => {
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Card title="回收趋势" bordered={false}>
          <TrendLine />
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '25%' }}
      >
        <Card title="Card title" bordered={false}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '25%' }}
      >
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '25%' }}
      >
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '25%' }}
      >
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  )
}

export default StatOverview
