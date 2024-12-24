import React, { FC, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Spin, Menu } from 'antd'
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/Header'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: '公共模版',
    key: '/templates/public',
    icon: <SnippetsOutlined />,
  },
  {
    label: '个人模版',
    key: '/templates/personal',
    icon: <UserOutlined />,
  },
]

const TemplatesLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState<string>('')

  const onClick: MenuProps['onClick'] = e => {
    setValue(e.key)
    setValue(e.key)
    nav(e.key)
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
                <Menu
                  className="rounded-t"
                  onClick={onClick}
                  selectedKeys={[value]}
                  mode="horizontal"
                  items={items}
                />
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
