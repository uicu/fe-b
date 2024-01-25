import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import Logo from '../Logo'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../../router/index'

const HeaderLayouts: FC = () => {
  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to={pathname} className="block" aria-label="Cruip">
              <Logo />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default HeaderLayouts
