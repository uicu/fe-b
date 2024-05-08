import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import HeaderLayouts from '../components/UI/HeaderLayouts'

const AuthLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

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
      </div>
    </div>
  )
}

export default AuthLayout
