import React, { FC } from 'react'
import MobileMenu from './MobileMenu'
import Logo from '../Logo'
import UserInfo from '../UserInfo'

const HeaderLayouts: FC = () => {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <UserInfo />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default HeaderLayouts
