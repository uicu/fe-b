import React, { useState } from 'react'
import { Pie } from '@ant-design/plots'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Spin, Empty } from 'antd'
import { getWorkStatOsService } from '../../../../../services/stat'

const EquipmentPie = () => {
  const { id = '' } = useParams()

  const [list, setList] = useState([])

  const { loading } = useRequest(
    async () => {
      const res = await getWorkStatOsService(id)
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
    height: 314,
    data: list,
    angleField: 'count',
    colorField: 'os',
    tooltip: {
      title: 'os',
      items: [{ channel: 'y' }],
    },
    paddingRight: 0,
    innerRadius: 0.6,
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
          text: '常用系统',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
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
            return <Pie {...config} />
          } else {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        }
      })()}
    </>
  )
}

export default EquipmentPie
