import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useLoadChannelData from '../hooks/useLoadChannelData'
import {
  LIST_SEARCH_TITLE,
  LIST_SEARCH_STATUS,
  LIST_SEARCH_QUANTITY,
  LIST_SEARCH_SORT,
  LIST_SEARCH_TIME_SPAN,
  LIST_SEARCH_CHANNEL,
} from '../constant'

const { Option } = Select

const QueryFilter: React.FC = () => {
  const { waitingChannelData, channelList } = useLoadChannelData()

  const nav = useNavigate()
  const { pathname } = useLocation()

  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  // 获取 url 参数，并设置到 input value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const title = searchParams.get(LIST_SEARCH_TITLE)
    const status = searchParams.get(LIST_SEARCH_STATUS)
    const quantity = searchParams.get(LIST_SEARCH_QUANTITY)
    const sort = searchParams.get(LIST_SEARCH_SORT)
    const timeSpan = searchParams.get(LIST_SEARCH_TIME_SPAN)
    const channel = searchParams.get(LIST_SEARCH_CHANNEL)
    form.setFieldsValue({ title, status, quantity, sort, timeSpan, channel })

    // 如果折叠的表单下选择了值
    if (timeSpan || quantity) {
      setExpand(true)
    }
  }, [searchParams])

  const onFinish = (values: {
    title: string
    status: string
    quantity: string
    sort: string
    timeSpan: string
    channel: string
  }) => {
    const search: string[] = []
    type valuesType = keyof typeof values
    Object.keys(values).forEach(key => {
      const value = values[key as valuesType]
      if (value) {
        search.push(`${key}=${value}`)
      }
    })
    // 跳转页面，增加 url 参数
    nav({
      pathname,
      search: search.join('&'), // 去掉了 page pageSize
    })
  }

  const getFields = () => {
    return (
      <>
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name="title" label="作品名称">
            <Input placeholder="作品名称" allowClear />
          </Form.Item>
        </Col>

        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name="sort" label="排序规则">
            <Select placeholder="排序规则" allowClear>
              <Option value="revise">最近修改</Option>
              <Option value="create">最新创建</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name="status" label="发布状态">
            <Select placeholder="发布状态" allowClear>
              <Option value="1">未发布</Option>
              <Option value="2">已发布</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '33.33%' }}
          lg={{ flex: '25%' }}
        >
          <Form.Item name="channel" label="作品类型">
            <Select placeholder="作品类型" disabled={waitingChannelData} allowClear>
              {channelList.map(item => {
                return (
                  <Option value={`${item.id}`} key={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
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
                  <Form.Item name="timeSpan" label="创建时间">
                    <Select placeholder="创建时间" allowClear>
                      <Option value="week">近一周</Option>
                      <Option value="moon">近一月</Option>
                      <Option value="quarter">近三月</Option>
                      <Option value="year">近一年</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col
                  xs={{ flex: '100%' }}
                  sm={{ flex: '50%' }}
                  md={{ flex: '33.33%' }}
                  lg={{ flex: '25%' }}
                >
                  <Form.Item name="quantity" label="回收数量">
                    <Select placeholder="回收数量" allowClear>
                      <Option value="1">1-99</Option>
                      <Option value="2">100-999</Option>
                      <Option value="3">1000-4999</Option>
                      <Option value="4">5000-10000</Option>
                      <Option value="5">10000以上</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )
          }
        })()}
      </>
    )
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
