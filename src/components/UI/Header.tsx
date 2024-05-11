import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom'
import { Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'
import Dropdown from '../Dropdown'
import MobileMenu from './MobileMenu'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/userReducer'

export default function Header() {
  const nav = useNavigate()
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
      nav('/auth/signin')
    }
  }

  const UserInfo = (
    <>
      <Link
        to="/auth/update"
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      >
        {userInfo?.headPic ? (
          <Avatar size="small" src={`http://localhost:8888/${userInfo?.headPic}`} />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
        <span className="ml-1">{userInfo?.nickname}</span>
      </Link>
      <button onClick={logout} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
        退出
      </button>
    </>
  )

  const Login = (
    <ul className="flex grow justify-end flex-wrap items-center">
      <li>
        <Link
          to="/auth/signin"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          登陆
        </Link>
      </li>
      <li>
        <Link to="/auth/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
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
        </Link>
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
                  <Link
                    to="/pricing"
                    className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutorials"
                    className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Blog
                  </Link>
                </li>
                {/* 1st level: hover */}
                <Dropdown title="Resources">
                  {/* 2nd level: hover */}
                  <li>
                    <Link
                      to="/documentation"
                      className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                    >
                      Support center
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/404"
                      className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                    >
                      404
                    </Link>
                  </li>
                </Dropdown>
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
