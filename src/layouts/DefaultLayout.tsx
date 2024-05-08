import React, { FC, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import FooterLayouts from '../components/UI/FooterLayouts'
import BannerLayouts from '../components/BannerLayouts'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/HeaderLayouts'

const DefaultLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  // 主题动画
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <div className="font-inter antialiased bg-white text-gray-900 tracking-tight">
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <HeaderLayouts />
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <main className="grow">
            <Outlet />
          </main>
        )}
        <FooterLayouts />
        <BannerLayouts />
      </div>
    </div>
  )
}

export default DefaultLayout
