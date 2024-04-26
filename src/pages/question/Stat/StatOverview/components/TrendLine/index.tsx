import React, { FC } from 'react'
import { Line } from '@ant-design/plots'
import moment from 'moment'

const TrendLine: FC = () => {
  const config = {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-slider.json',
    },
    tooltip: {
      items: [{ name: '回收量', channel: 'y' }],
    },
    height: 300,
    xField: (d: { date: string }) => new Date(d.date),
    yField: 'close',
    axis: { x: { title: false, size: 40 }, y: { title: false, size: 36 } },
    slider: {
      x: { labelFormatter: (d: string) => moment(d).format('YYYY/MM/DD') },
      y: { labelFormatter: '~s' },
    },
  }
  return <Line {...config} />
}

export default TrendLine
