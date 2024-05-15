import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin, Row } from 'antd'
import WorkCard from '../../components/WorkCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadWorkListData from '../../hooks/useLoadWorkListData'

const { Title } = Typography

const Star: FC = () => {
  useTitle('星标问卷')
  const { data = {}, loading, refresh } = useLoadWorkListData({ isStar: true })
  const { works: list = [], totalCount: total = 0 } = data
  return (
    <>
      <div className="mb-6 p-6 bg-white rounded">
        <div className="flex items-center">
          <Title level={3} className="flex-1 !m-0">
            星标问卷
          </Title>
          <div className="flex-1 text-right">
            <ListSearch />
          </div>
        </div>
      </div>

      <div className="mb-5">
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
                answerCount: number
                channelName: string
                isTemplate: boolean
              }) => {
                const { id } = item
                return (
                  <WorkCard
                    key={id}
                    {...item}
                    onChangeOffset={() => {
                      refresh() // 手动刷新列表
                    }}
                    tab="star"
                  />
                )
              }
            )}
          </Row>
        )}
      </div>

      <div className="text-center">
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
