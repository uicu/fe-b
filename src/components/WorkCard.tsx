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
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { updateWorkService, copyWorkService, deleteWorkService } from '../services/work'

const { Meta } = Card

type PropsType = {
  coverImg: string
  id: string
  title: string
  isStar: boolean
  status: number
  answerCount: number
}

const WorkCard: FC<PropsType> = (props: PropsType) => {
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const nav = useNavigate()
  const { coverImg, id, title, isStar, status, answerCount } = props
  const isPublished = status === 2

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
      },
    }
  )

  function del() {
    modal.confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteWork,
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '33.33%' }} lg={{ flex: '25%' }}>
      {contextHolder}
      {contextHolderMessage}
      <Card
        style={{ width: '100%' }}
        cover={
          <img
            alt="封面图"
            src={
              coverImg
                ? `https://uicu-1252254586.cos.ap-guangzhou.myqcloud.com/${coverImg}`
                : '/images/tutorial-01.jpg'
            }
            className="h-32"
          />
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
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>回收量: {answerCount}</span>
            </Space>
          }
        />
      </Card>
    </Col>
  )
}

export default WorkCard
