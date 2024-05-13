import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import {
  Typography,
  Empty,
  Button,
  Space,
  Modal,
  Spin,
  message,
  Row,
  Col,
  Card,
  Popconfirm,
} from 'antd'
import { ExclamationCircleOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadWorkListData from '../../hooks/useLoadWorkListData'
import { updateWorkService, deleteThoroughWorkService } from '../../services/work'
import styles from './common.module.scss'

const { Title } = Typography
const { Meta } = Card

const Trash: FC = () => {
  useTitle('回收站')
  const [modal, contextHolder] = Modal.useModal()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const { data = {}, loading, refresh } = useLoadWorkListData({ status: 0 })
  const { works: list = [], totalCount: total = 0 } = data

  // 恢复
  const { run: recover } = useRequest(
    async (id: string) => {
      await updateWorkService(id, { status: 1 })
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

  // 彻底删除
  const { run: deleteWork } = useRequest(
    async (id: string) => await deleteThoroughWorkService(id),
    {
      manual: true,
      onSuccess() {
        messageApi.success('删除成功')
        refresh()
      },
    }
  )

  function del(id: string) {
    modal.confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可以找回，请谨慎操作',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteWork(id)
      },
    })
  }

  return (
    <>
      {contextHolder}
      {contextHolderMessage}
      <div className="mb-6 p-6 bg-white rounded">
        <div className={`${styles.header}`}>
          <Title level={4} className={styles.left}>
            回收站
          </Title>
          <div className={styles.right}>
            <ListSearch />
          </div>
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
                id: string
                title: string
                isStar: boolean
                isPublished: boolean
                answerCount: number
                createdAt: string
                coverImg: string
              }) => {
                const { id, title, answerCount, coverImg } = item
                const key = `col-${id}`
                return (
                  <Col
                    key={key}
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '33.33%' }}
                    lg={{ flex: '25%' }}
                  >
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
                          title="确定恢复该问卷？"
                          okText="确定"
                          cancelText="取消"
                          onConfirm={() => {
                            recover(id)
                          }}
                        >
                          <Button type="text" icon={<UndoOutlined />} size="small">
                            恢复
                          </Button>
                        </Popconfirm>,
                        <Button
                          key={id}
                          icon={<DeleteOutlined />}
                          type="text"
                          size="small"
                          onClick={() => {
                            del(id)
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
