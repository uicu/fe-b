import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Segmented, Spin } from 'antd'
import { SnippetsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/HeaderLayouts'

const ManageLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState<string>(pathname)
  const onChange = (value: string) => {
    setValue(value)
    nav(value)
  }
  return (
    <div className="font-inter antialiased bg-white text-gray-900 tracking-tight">
      <HeaderLayouts />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-4 md:pt-28 md:pb-4 block min-w-[256px] md:inline-block">
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
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageLayout
