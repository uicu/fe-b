import React, { FC, useState } from 'react'
import { Line } from '@ant-design/plots'
import moment from 'moment'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Spin, Empty } from 'antd'
import { getQuestionStatTrendService } from '../../../../../services/stat'

const TrendLine: FC = () => {
  const { id = '' } = useParams()

  const [list, setList] = useState([])

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatTrendService(id)
      return res
    },
    {
      refreshDeps: [id],
      onSuccess(res) {
        const data = res.data.map((item: { count: string }) => {
          return {
            ...item,
            count: Number(item.count),
          }
        })
        setList(data)
      },
    }
  )

  const config = {
    data: list,
    tooltip: {
      items: [{ name: '回收量', channel: 'y' }],
    },
    height: 300,
    xField: (d: { createDate: string }) => new Date(d.createDate),
    yField: 'count',
    axis: { x: { title: false, size: 40 }, y: { title: false, size: 36 } },
    slider: {
      x: { labelFormatter: (d: string) => moment(d).format('YYYY/MM/DD') },
      y: { labelFormatter: '~s' },
    },
  }
  return (
    <>
      {(() => {
        if (loading) {
          return (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )
        } else {
          if (list.length) {
            return <Line {...config} />
          } else {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        }
      })()}
    </>
  )
}

export default TrendLine
