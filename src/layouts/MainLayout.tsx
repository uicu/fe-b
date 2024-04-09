import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import BannerLayouts from '../components/BannerLayouts'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/HeaderLayouts'

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <div className="font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
      <div className="flex flex-col min-h-screen overflow-hidden">
        <HeaderLayouts />
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
        <BannerLayouts />
      </div>
    </div>
  )
}

export default MainLayout
