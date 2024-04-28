import React, { FC } from 'react'
import { Line } from '@ant-design/plots'
import moment from 'moment'

const TrendLine: FC = () => {
  const config = {
    data: [
      {
        date: '2007-04-23',
        close: 93.24,
      },
      {
        date: '2007-04-24',
        close: 95.35,
      },
      {
        date: '2007-04-25',
        close: 98.84,
      },
      {
        date: '2007-04-26',
        close: 99.92,
      },
      {
        date: '2007-04-29',
        close: 99.8,
      },
      {
        date: '2007-05-01',
        close: 99.47,
      },
    ],
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
