import React, { FC, useState } from 'react'
import { Typography, Row, Divider } from 'antd'
import { useTitle } from 'ahooks'

const { Title } = Typography

const Personal: FC = () => {
  useTitle('个人模版')
  const [list, setList] = useState([]) // 全部的列表数据

  return (
    <>
      <div className="mb-6 p-6 bg-white rounded">
        <Title level={4}>星标问卷</Title>
        <p>由平台整理和用户共享的应用模板</p>
      </div>

      <div className="mb-5">
        {/* 问卷列表 */}
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
              }) => {
                const { id } = item
                return <div key={id}></div>
              }
            )}
          </Row>
        )}
      </div>
    </>
  )
}

export default Personal
