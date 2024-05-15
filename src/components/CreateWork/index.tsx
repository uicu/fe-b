import React, { FC, useState } from 'react'
import { Button, Modal, message, Form, Space, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { createWorkService } from '../../services/work'
import useLoadChannelData from '../../hooks/useLoadChannelData'

const { TextArea } = Input
const { Option } = Select

const CreateWork: FC = () => {
  const { waitingChannelData, channelList } = useLoadChannelData()

  const nav = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 新建作品
  const { run: onFinish, loading: disabled } = useRequest(
    async (values: { title: string; channelId: number; desc: string }) => {
      const data = await createWorkService(values)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { id } = result.data
        nav(`/work/edit/${id}`)
        messageApi.success('创建成功')
      },
    }
  )

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showModal}
        disabled={disabled}
      >
        新建
      </Button>

      <Modal
        title="新建作品"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish} className="pb-0">
          <Form.Item
            name="title"
            label="作品名称"
            rules={[{ required: true, message: '请输入作品名称!' }]}
          >
            <Input placeholder="作品名称" allowClear />
          </Form.Item>

          <Form.Item
            name="channelId"
            label="作品类型"
            rules={[{ required: true, message: '请输入作品类型!' }]}
          >
            <Select placeholder="作品类型" disabled={waitingChannelData} allowClear>
              {channelList.map(item => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="desc"
            label="描述"
            rules={[{ required: true, message: '请输入作品描述!' }]}
          >
            <TextArea rows={4} placeholder="作品描述" allowClear />
          </Form.Item>

          <div className="text-right">
            <Space size="small">
              <Button
                onClick={() => {
                  form.resetFields()
                }}
              >
                清空
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default CreateWork
