import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Tag, Popconfirm, Modal, message, Card, Popover } from 'antd'
import {
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'

const { Meta } = Card
const { confirm } = Modal

type PropsType = {
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, answerCount, isPublished, isStar } = props

  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        message.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        const { id } = result.data
        message.success('复制成功')
        nav(`/question/edit/${id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <Card
      style={{ width: '100%' }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Popconfirm
          key={_id}
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
          key={_id}
          icon={<EditOutlined />}
          type="text"
          size="small"
          onClick={() => nav(`/question/edit/${_id}`)}
        >
          编辑
        </Button>,
        <Popover
          key={_id}
          placement="bottom"
          content={
            <Space direction="vertical">
              <Button
                block
                type="text"
                icon={<StarOutlined />}
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
                onClick={() => nav(`/question/stat/${_id}`)}
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
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>{title}</Link>
        }
        description={
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>回收量: {answerCount}</span>
          </Space>
        }
      />
    </Card>
  )
}

export default QuestionCard
