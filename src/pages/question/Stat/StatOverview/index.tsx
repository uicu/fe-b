import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import TrendLine from './components/TrendLine'
import StatMap from './components/StatMap'

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
        xl={{ flex: '33.33%' }}
      >
        <Card title="地域位置" bordered={false}>
          <StatMap />
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '33.33%' }}
      >
        <Card title="常用设备" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '33.33%' }}
      >
        <Card title="常用系统" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '100%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '33.33%' }}
        xl={{ flex: '33.33%' }}
      >
        <Card title="渠道来源" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  )
}

export default StatOverview
