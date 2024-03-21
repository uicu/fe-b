import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'

const { Option } = Select

const QueryFilter: React.FC = () => {
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  const getFields = () => {
    const count = expand ? 10 : 6
    const children = []
    for (let i = 0; i < count; i++) {
      children.push(
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
          key={i}
        >
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: 'Select something!',
                },
              ]}
              initialValue="1"
            >
              <Select>
                <Option value="1">12</Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      )
    }
    return children
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="p-6">
      <Row gutter={[16, 0]}>{getFields()}</Row>
      <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            onClick={() => {
              form.resetFields()
            }}
          >
            清空
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> 展开
          </a>
        </Space>
      </div>
    </Form>
  )
}

export default QueryFilter
