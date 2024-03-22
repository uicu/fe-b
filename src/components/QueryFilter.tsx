import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space, DatePicker, Radio, Checkbox } from 'antd'

const { Option } = Select

const QueryFilter: React.FC = () => {
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  const getFields = () => {
    return (
      <>
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name={`field-1`} label="问卷名称">
            <Input placeholder="问卷名称" />
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name={`field-2`} label="发布状态">
            <Select placeholder="发布状态">
              <Option value="1">已发布</Option>
              <Option value="2">未发布</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name={`field-5`} label="回收数量">
            <Select placeholder="回收数量">
              <Option value="1">1-99</Option>
              <Option value="2">100-1000</Option>
              <Option value="3">999-5000</Option>
              <Option value="4">4999-10000</Option>
              <Option value="5">10000以上</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name={`field-3`} label="创建时间">
            <DatePicker className="w-full" placeholder="创建时间" />
          </Form.Item>
        </Col>
        {(() => {
          if (expand) {
            return (
              <>
                <Col
                  xs={{ flex: '100%' }}
                  sm={{ flex: '50%' }}
                  md={{ flex: '33.33%' }}
                  lg={{ flex: '25%' }}
                >
                  <Form.Item name={`field-4`} label="时间跨度">
                    <Radio.Group>
                      <Radio value="1">近一周</Radio>
                      <Radio value="2">近一月</Radio>
                      <Radio value="2">近三月</Radio>
                      <Radio value="2">近一年</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col
                  xs={{ flex: '100%' }}
                  sm={{ flex: '50%' }}
                  md={{ flex: '33.33%' }}
                  lg={{ flex: '25%' }}
                >
                  <Form.Item name="checkbox-group" label="问卷类型">
                    <Checkbox.Group>
                      <Checkbox value="A">普通</Checkbox>
                      <Checkbox value="B">考试</Checkbox>
                      <Checkbox value="C">评测</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </>
            )
          }
        })()}
      </>
    )
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="p-6 pb-0">
      <Row gutter={[16, 0]}>{getFields()}</Row>
      <div className="text-right">
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
            className="text-xs"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> {expand ? '收起' : '展开'}
          </a>
        </Space>
      </div>
    </Form>
  )
}

export default QueryFilter
