import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin, Row, Col } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('星标问卷')

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={`${styles.header} px-5 bg-white rounded mb-6 p-6`}>
        <Title level={4} className={styles.left}>
          星标问卷
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

        {list.length > 0 && (
          <Row gutter={[16, 24]}>
            {list.map(
              (item: {
                coverImg: string
                id: string
                title: string
                isStar: boolean
                status: number
              }) => {
                const { id } = item
                const key = `col-${id}`
                return (
                  <Col
                    key={key}
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '33.33%' }}
                    lg={{ flex: '25%' }}
                  >
                    <QuestionCard key={id} {...item} />
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

export default Star
