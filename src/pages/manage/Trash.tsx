import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Button, Space, Modal, Spin, message, Row, Col, Card } from 'antd'
import { ExclamationCircleOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadWorkListData from '../../hooks/useLoadWorkListData'
import { updateWorkService, deleteWorkService } from '../../services/work'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal
const { Meta } = Card

const Trash: FC = () => {
  useTitle('回收站')
  const [messageApi, contextHolder] = message.useMessage()

  const { data = {}, loading, refresh } = useLoadWorkListData({ isDeleted: true })
  const { works: list = [], totalCount: total = 0 } = data

  // 恢复
  const { run: recover } = useRequest(
    async (id: string) => {
      await updateWorkService(id, { isDeleted: false })
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
  const { run: deleteWork } = useRequest(async (id: string) => await deleteWorkService([id]), {
    manual: true,
    onSuccess() {
      messageApi.success('删除成功')
      refresh()
    },
  })

  function del(id: string) {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
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
                const { _id, title, answerCount } = item
                const key = `col-${_id}`
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
