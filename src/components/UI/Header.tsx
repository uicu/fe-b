import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'
import MobileMenu from './MobileMenu'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/userReducer'

export default function Header() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const userInfo = useGetUserInfo()

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  const logout = () => {
    if (typeof window !== 'undefined') {
      dispatch(logoutReducer())
      Cookie.remove('USER_TOKEN')
      Cookie.remove('REFRESH_USER_TOKEN')
      messageApi.success('退出成功')
    }
  }

  const UserInfo = (
    <>
      <a
        href="/auth/update"
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      >
        {userInfo?.headPic ? (
          <Avatar size="small" src={`http://localhost:8888/${userInfo?.headPic}`} />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
        <span className="ml-1">{userInfo?.nickname}</span>
      </a>
      <a
        href="/auth/signin"
        onClick={logout}
        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
      >
        退出
      </a>
    </>
  )

  const Login = (
    <ul className="flex grow justify-end flex-wrap items-center">
      <li>
        <a
          href="/auth/signin"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          登陆
        </a>
      </li>
      <li>
        <a href="/auth/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
          <span>注册</span>
          <svg
            className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </li>
    </ul>
  )

  return (
    <>
      {contextHolder}
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top ? 'bg-white backdrop-blur-sm shadow-lg' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              <Logo />
            </div>
            {/* Desktop navigation */}
            <nav className="hidden md:flex md:grow">
              {/* Desktop menu links */}
              <ul className="flex grow justify-start flex-wrap items-center">
                <li>
                  <NavLink
                    to="/manage/list"
                    className={() => {
                      const isActive = ['/manage/list', '/manage/star', '/manage/trash'].some(
                        route => pathname.includes(route)
                      )
                      const styles =
                        'text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out'
                      return isActive ? `text-purple-600 ${styles}` : `${styles}`
                    }}
                  >
                    工作台
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/templates/all"
                    className={() => {
                      const isActive = ['/templates/all', '/templates/personal'].some(route =>
                        pathname.includes(route)
                      )
                      const styles =
                        'text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out'
                      return isActive ? `text-purple-600 ${styles}` : `${styles}`
                    }}
                  >
                    模版库
                  </NavLink>
                </li>
                {/* <li>
                  <Link
                    to="/tutorials"
                    className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Tutorials
                  </Link>
                </li> */}
              </ul>
              {userInfo?.username ? UserInfo : Login}
            </nav>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  )
}
