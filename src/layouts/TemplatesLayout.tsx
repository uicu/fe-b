import React, { FC, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Segmented, Spin } from 'antd'
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/Header'

const TemplatesLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState<string>('')

  const onChange = (value: string) => {
    setValue(value)
    nav(value)
  }

  useEffect(() => {
    if (pathname === value) return
    setValue(pathname)
  }, [pathname])

  return (
    <div className="font-inter antialiased bg-white text-gray-900 tracking-tight">
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <HeaderLayouts />
        <main className="grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-28 pb-12 md:pt-28 md:pb-20">
                <div className="pb-6 md:pb-6 block min-w-[256px] md:inline-block">
                  <Segmented
                    block
                    options={[
                      { label: '公共模版', value: '/templates/public', icon: <SnippetsOutlined /> },
                      { label: '个人模版', value: '/templates/personal', icon: <UserOutlined /> },
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

export default TemplatesLayout
