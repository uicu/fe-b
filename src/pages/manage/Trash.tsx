import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
  message,
  Row,
  Col,
  Card,
} from 'antd'
import { ExclamationCircleOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal
const { Meta } = Card

const Trash: FC = () => {
  useTitle('回收站')
  const [messageApi, contextHolder] = message.useMessage()

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 恢复
  const { run: recover } = useRequest(
    async (id: string) => {
      await updateQuestionService(id, { isDeleted: false })
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        messageApi.success('恢复成功')
        refresh() // 手动刷新列表
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(
    async (id: string) => await deleteQuestionsService([id]),
    {
      manual: true,
      onSuccess() {
        messageApi.success('删除成功')
        refresh()
      },
    }
  )

  function del(id: string) {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteQuestion(id)
      },
    })
  }

  // const tableColumns = [
  //   {
  //     title: '标题',
  //     dataIndex: 'title',
  //     // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
  //   },
  //   {
  //     title: '是否发布',
  //     dataIndex: 'isPublished',
  //     render: (isPublished: boolean) => {
  //       return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
  //     },
  //   },
  //   {
  //     title: '答卷',
  //     dataIndex: 'answerCount',
  //   },
  //   {
  //     title: '创建时间',
  //     dataIndex: 'createdAt',
  //   },
  //   {
  //     title: '操作',
  //     key: 'action',
  //     width: '144px',
  //     render: (_: object, record: { _id: string }) => (
  //       <Space size="middle">
  //         <Button
  //           size="small"
  //           type="primary"
  //           onClick={() => {
  //             console.log(record)
  //             recover(record._id)
  //           }}
  //         >
  //           恢复
  //         </Button>
  //         <Button
  //           size="small"
  //           danger
  //           onClick={() => {
  //             del(record._id)
  //           }}
  //         >
  //           删除
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ]

  // 可以把 JSX 片段定义为一个变量
  // const TableElem = (
  //   <>
  //     <div style={{ border: '1px solid #e8e8e8' }}>
  //       <Table dataSource={list} columns={tableColumns} pagination={false} rowKey={q => q._id} />
  //     </div>
  //   </>
  // )

  return (
    <>
      {contextHolder}
      <div className={`${styles.header} px-5 bg-white rounded mb-6 p-6`}>
        <Title level={4} className={styles.left}>
          回收站
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {/* {list.length > 0 && TableElem} */}
        {list.length > 0 && (
          <Row gutter={[16, 24]}>
            {list.map(
              (item: {
                _id: string
                title: string
                isStar: boolean
                isPublished: boolean
                answerCount: number
                createdAt: string
              }) => {
                const { _id, title, answerCount, createdAt } = item
                const key = `col-${_id}`
                return (
                  <Col
                    key={key}
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '33.33%' }}
                    lg={{ flex: '25%' }}
                  >
                    {/* <QuestionCard key={_id} {...item} /> */}

                    <Card
                      style={{ width: '100%' }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <Button
                          key={_id}
                          type="text"
                          icon={<UndoOutlined />}
                          size="small"
                          onClick={() => {
                            recover(_id)
                          }}
                        >
                          恢复
                        </Button>,
                        <Button
                          key={_id}
                          icon={<DeleteOutlined />}
                          type="text"
                          size="small"
                          onClick={() => {
                            del(_id)
                          }}
                        >
                          彻底删除
                        </Button>,
                      ]}
                    >
                      <Meta
                        title={title}
                        description={
                          <Space>
                            <span>回收量: {answerCount}</span>
                          </Space>
                        }
                      />
                    </Card>
                  </Col>
                )
              }
            )}
          </Row>
        )}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
