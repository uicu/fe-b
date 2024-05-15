import React, { FC, useState } from 'react'
import { Button, Card, Col, Tag, Modal, message } from 'antd'
import {
  CopyOutlined,
  EyeOutlined,
  RotateLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { copyWorkService, removeTemplateWorkService } from '../services/work'

const { Meta } = Card

type PropsType = {
  id: string
  title: string
  desc: string
  channelName: string
  templateCoverImg: string
  isHot: number
  isNew: number
  tab: string
  onChangeOffset?: (value: number) => void
}

const TemplatesCard: FC<PropsType> = (props: PropsType) => {
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, contextHolderMessage] = message.useMessage()
  const nav = useNavigate()
  const { id, title, desc, channelName, templateCoverImg, isHot, isNew, onChangeOffset, tab } =
    props

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

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await copyWorkService(id),
    {
      manual: true,
      onSuccess(result) {
        const { id } = result.data
        messageApi.success('创建成功')
        nav(`/work/edit/${id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 移出该模版
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteWork } = useRequest(
    async () => await removeTemplateWorkService(id),
    {
      manual: true,
      onSuccess() {
        messageApi.success('移出成功')
        setIsDeletedState(true)
        onChangeOffset?.(1)
      },
    }
  )

  function del() {
    modal.confirm({
      title: '确定移出该模版？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteWork,
    })
  }

  // 已经移出的模版，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '33.33%' }} lg={{ flex: '25%' }}>
      {contextHolder}
      <Modal
        title="模板预览"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={660}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {contextHolderMessage}
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={
          <div className="relative">
            <div className="absolute top-1.5 left-1.5">
              {!!isHot && <Tag color="#f50">热门</Tag>}
              {!!isNew && <Tag color="#87d068">新</Tag>}
              <Tag>{channelName}</Tag>
            </div>
            <img
              alt="封面图"
              src={
                templateCoverImg
                  ? `https://uicu-1252254586.cos.ap-guangzhou.myqcloud.com/${templateCoverImg}`
                  : '/images/base-01.jpg'
              }
              className="min-h-32"
            />
          </div>
        }
        actions={[
          <Button key={id} type="text" icon={<EyeOutlined />} size="small" onClick={showModal}>
            预览
          </Button>,
          <>
            {tab === 'personal' && (
              <Button
                key={id}
                type="text"
                icon={<RotateLeftOutlined />}
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                移出
              </Button>
            )}
          </>,
          <Button
            key={id}
            icon={<CopyOutlined />}
            type="text"
            size="small"
            disabled={duplicateLoading}
            onClick={duplicate}
          >
            使用
          </Button>,
        ]}
      >
        <Meta
          title={
            <p className="!text-slate-950 max-w-40 inline-block whitespace-nowrap text-ellipsis overflow-hidden">
              {title}
            </p>
          }
          description={desc}
        />
      </Card>
    </Col>
  )
}

export default TemplatesCard
