import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { DashboardOutlined, ProfileOutlined } from '@ant-design/icons'
import { Spin, Result, Button, Segmented } from 'antd'
import { useTitle } from 'ahooks'

import useLoadWorkData from '../../../hooks/useLoadWorkData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { loading } = useLoadWorkData()
  const { title, status } = useGetPageInfo()

  const { pathname } = useLocation()
  const [value, setValue] = useState<string>(pathname)
  const onChange = (value: string) => {
    setValue(value)
    nav(value)
  }

  // 是否发布
  const isPublished = status === 2

  // 修改标题
  useTitle(`作品统计 - ${title}`)

  // Content Elem
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div className="bg-gray-50 min-h-screen">
          <div className="bg-white h-20">{/* 导航样式 */}</div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div style={{ flex: '1' }}>
              <Result
                status="warning"
                title="该页面尚未发布"
                extra={
                  <Button type="primary" onClick={() => nav('/manage/list')}>
                    列表
                  </Button>
                }
              ></Result>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white h-20">{/* 导航样式 */}</div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-6 pb-3 block md:inline-block">
            <Segmented
              block
              options={[
                {
                  label: '数据概览',
                  value: `/work/stat/${id}/overview`,
                  icon: <DashboardOutlined />,
                },
                {
                  label: '统计详情',
                  value: `/work/stat/${id}/details`,
                  icon: <ProfileOutlined />,
                },
              ]}
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="pt-3 pb-6">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <StatHeader />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <>{genContentElem()}</>
      )}
    </div>
  )
}

export default Stat
