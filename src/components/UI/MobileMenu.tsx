import React, { useState, useRef, useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { USER_TOKEN, REFRESH_USER_TOKEN, USER_INFO, removeToken } from '../../utils/local-storage'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/userReducer'
import { LOGIN_PATHNAME, REGISTER_PATHNAME, UPDATE_INFO_PATHNAME } from '../../router'

const MobileMenu: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()
  const nav = useNavigate()
  const { username, nickName, headPic } = useGetUserInfo() // 从 redux 中获取用户信息

  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user 数据
    removeToken(USER_TOKEN) // 清除 token 的存储
    removeToken(REFRESH_USER_TOKEN)
    removeToken(USER_INFO)
    messageApi.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

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

  const UserInfo = (
    <>
      <div>
        <Link to={UPDATE_INFO_PATHNAME} className="flex text-gray-600 hover:text-gray-900 py-2">
          <Avatar src={headPic ? `http://localhost:8888/${headPic}` : <UserOutlined />} />
          <span className="ml-1">{nickName}</span>
        </Link>
      </div>
      <div>
        <button
          onClick={logout}
          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
        >
          退出
          <svg
            className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
              fill="#999"
              fillRule="nonzero"
            />
          </svg>
        </button>
      </div>
    </>
  )

  const Login = (
    <>
      <div>
        <Link
          to={LOGIN_PATHNAME}
          className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
          onClick={() => setMobileNavOpen(false)}
        >
          登陆
        </Link>
      </div>
      <div>
        <Link
          to={REGISTER_PATHNAME}
          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
          onClick={() => setMobileNavOpen(false)}
        >
          注册
          <svg
            className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
              fill="#999"
              fillRule="nonzero"
            />
          </svg>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {contextHolder}
      <div className="md:hidden">
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
        <nav
          id="mobile-nav"
          ref={mobileNav}
          className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out bg-white"
          style={
            mobileNavOpen
              ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 }
              : { maxHeight: 0, opacity: 0.8 }
          }
        >
          <ul className="px-5 py-2">
            <li>
              <Link
                to="/pricing"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/tutorials"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li className="py-2 my-2 border-t border-b border-gray-200">
              <span
                className="flex text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Resources
              </span>
              <ul className="pl-4">
                <li>
                  <Link
                    to="/documentation"
                    className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Support center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/404"
                    className="text-sm flex font-medium text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    404
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="px-5 py-2">{username ? UserInfo : Login}</div>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu
