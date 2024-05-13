import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Segmented, Spin } from 'antd'
import { SnippetsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/Header'

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
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <HeaderLayouts />
        <main className="grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-24 pb-12 md:pt-24 md:pb-20">
                <div className="pb-6 md:pb-6 block min-w-[256px] md:inline-block">
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
                <div>
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
          </section>
        </main>
      </div>
    </div>
  )
}

export default ManageLayout
