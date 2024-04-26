import React from 'react'
import { Pie } from '@ant-design/plots'

const DemoPie = () => {
  const config = {
    height: 314,
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
    ],
    angleField: 'value',
    colorField: 'type',
    paddingRight: 0,
    innerRadius: 0.6,
    // label: {
    //   text: 'value',
    //   style: {
    //     fontWeight: 'bold',
    //   },
    // },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: '常用设备',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  }
  return <Pie {...config} />
}

export default DemoPie
