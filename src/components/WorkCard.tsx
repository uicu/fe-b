import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Tag, Popconfirm, Modal, message, Card, Popover, Col } from 'antd'
import {
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  InboxOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  updateWorkService,
  copyWorkService,
  deleteWorkService,
  publishTemplateWorkService,
  publishWorkService,
  pauseWorkService,
} from '../services/work'

const { Meta } = Card

type PropsType = {
  tab: string
  coverImg: string
  id: string
  title: string
  isStar: boolean
  status: number
  answerCount: number
  channelName: string
  isTemplate: boolean
  onChangeOffset?: (value: number) => void
}

const WorkCard: FC<PropsType> = (props: PropsType) => {
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const nav = useNavigate()
  const {
    coverImg,
    id,
    title,
    isStar,
    status,
    answerCount,
    onChangeOffset,
    tab,
    channelName,
    isTemplate,
  } = props

  // 发布或暂停
  const [isPublished, setIsPublished] = useState(status === 2)
  const { loading: publishLoading, run: publish } = useRequest(
    async () => {
      await publishWorkService(id)
    },
    {
      manual: true,
      onSuccess() {
        setIsPublished(true)
        messageApi.success('已发布')
      },
    }
  )
  const { loading: pauseLoading, run: pause } = useRequest(
    async () => {
      await pauseWorkService(id)
    },
    {
      manual: true,
      onSuccess() {
        setIsPublished(false)
        messageApi.success('已暂停')
      },
    }
  )

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateWorkService(id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        // 如果是在星标tab下
        if (tab === 'star') {
          onChangeOffset?.(1)
        }
        messageApi.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await copyWorkService(id),
    {
      manual: true,
      onSuccess(result) {
        const { id } = result.data
        messageApi.success('复制成功')
        nav(`/work/edit/${id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteWork } = useRequest(
    async () => await deleteWorkService(id),
    {
      manual: true,
      onSuccess() {
        messageApi.success('删除成功')
        setIsDeletedState(true)
        onChangeOffset?.(1)
      },
    }
  )
  function del() {
    modal.confirm({
      title: '确定删除该作品？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteWork,
    })
  }

  // 发布为模版
  const [isTemplateState, setIsTemplateState] = useState(isTemplate)
  const { loading: templateLoading, run: publishTemplate } = useRequest(
    async () => await publishTemplateWorkService(id),
    {
      manual: true,
      onSuccess() {
        messageApi.success('发布成功')
        setIsTemplateState(true)
      },
    }
  )
  function template() {
    modal.confirm({
      title: '确定发布并保存为模版？',
      icon: <ExclamationCircleOutlined />,
      onOk: publishTemplate,
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '33.33%' }} lg={{ flex: '25%' }}>
      {contextHolder}
      {contextHolderMessage}
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={
          <div className="relative">
            <div className="absolute top-1.5 left-1.5">
              {!!isTemplateState && <Tag color="#f50">个人模版</Tag>}
              <Tag>{channelName}</Tag>
            </div>
            <img
              alt="封面图"
              src={
                coverImg
                  ? `https://uicu-1252254586.cos.ap-guangzhou.myqcloud.com/${coverImg}`
                  : '/images/base-01.jpg'
              }
              className="min-h-32"
            />
          </div>
        }
        actions={[
          <Popconfirm
            key={id}
            title="确定复制该问卷？"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
          >
            <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>,
          <Button
            key={id}
            icon={<EditOutlined />}
            type="text"
            size="small"
            onClick={() => nav(`/work/edit/${id}`)}
          >
            编辑
          </Button>,
          <Popover
            key={id}
            placement="bottom"
            content={
              <Space direction="vertical">
                <Button
                  block
                  icon={isPublished ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  type="text"
                  size="small"
                  disabled={publishLoading || pauseLoading}
                  onClick={() => {
                    if (isPublished) {
                      pause()
                    } else {
                      publish()
                    }
                  }}
                >
                  {isPublished ? '暂停' : '发布'}
                </Button>
                <Button
                  block
                  type="text"
                  icon={
                    isStarState ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />
                  }
                  size="small"
                  onClick={changeStar}
                  disabled={changeStarLoading}
                >
                  {isStarState ? '取消' : '标星'}
                </Button>
                <Button
                  block
                  icon={<LineChartOutlined />}
                  type="text"
                  size="small"
                  onClick={() => nav(`/work/stat/${id}/overview`)}
                  disabled={!isPublished}
                >
                  统计
                </Button>
                {!isTemplateState && (
                  <Button
                    block
                    type="text"
                    icon={<InboxOutlined />}
                    size="small"
                    onClick={template}
                    disabled={templateLoading}
                  >
                    模版
                  </Button>
                )}
                <Button
                  block
                  type="text"
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={del}
                  disabled={deleteLoading}
                >
                  删除
                </Button>
              </Space>
            }
          >
            <EllipsisOutlined key="ellipsis" />
          </Popover>,
        ]}
      >
        <Meta
          title={
            <Link
              className="!text-slate-950 max-w-40 inline-block whitespace-nowrap text-ellipsis overflow-hidden"
              to={isPublished ? `/work/stat/${id}/overview` : `/work/edit/${id}`}
            >
              {title}
            </Link>
          }
          description={
            <div className="flex justify-between">
              {isPublished ? (
                <p className="text-green-400">已发布</p>
              ) : (
                <p className="text-gray-400">未发布</p>
              )}
              <span>回收量: {answerCount}</span>
            </div>
          }
        />
      </Card>
    </Col>
  )
}

export default WorkCard
