import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Segmented } from 'antd'
import { SnippetsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState<string>(pathname)

  const onChange = (value: string) => {
    setValue(value)
    nav(value)
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white h-20">{/* 导航样式 */}</div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 pb-3 block min-w-[256px] md:inline-block">
          <Segmented
            block
            options={[
              { label: '我的', value: '/manage/list', icon: <SnippetsOutlined /> },
              { label: '星标', value: '/manage/star', icon: <StarOutlined /> },
              { label: '回收站', value: '/manage/trash', icon: <DeleteOutlined /> },
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

export default ManageLayout
