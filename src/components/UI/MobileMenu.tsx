import React, { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import Cookie from 'js-cookie'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/userReducer'

export default function MobileMenu() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const userInfo = useGetUserInfo()

  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  const logout = () => {
    if (typeof window !== 'undefined') {
      dispatch(logoutReducer())
      Cookie.remove('USER_TOKEN')
      Cookie.remove('REFRESH_USER_TOKEN')
      messageApi.success('退出成功')
    }
  }

  const UserInfo = (
    <div className="px-5 py-2">
      <a
        href="/auth/update"
        className="text-gray-600 hover:text-gray-900 py-3 flex items-center justify-center"
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
        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
      >
        退出
      </a>
    </div>
  )

  const Login = (
    <ul className="px-5 py-2">
      <li>
        <a
          href="/auth/signin"
          className="text-gray-600 hover:text-gray-900 py-3 flex items-center justify-center"
        >
          登陆
        </a>
      </li>
      <li>
        <a
          href="/auth/signup"
          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
        >
          注册
        </a>
      </li>
    </ul>
  )

  return (
    <div className="flex md:hidden">
      {contextHolder}
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <NavLink
                to="/manage/list"
                className={() => {
                  const isActive = ['/manage/list', '/manage/star', '/manage/trash'].some(route =>
                    pathname.includes(route)
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
                to="/templates/public"
                className={() => {
                  const isActive = ['/templates/public', '/templates/personal'].some(route =>
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
              <NavLink
                to="/auth/signin"
                className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                onClick={() => setMobileNavOpen(false)}
              >
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/signup"
                className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
                onClick={() => setMobileNavOpen(false)}
              >
                <span>Sign up</span>
              </NavLink>
            </li> */}
          </ul>
          {userInfo?.username ? UserInfo : Login}
        </Transition>
      </div>
    </div>
  )
}
