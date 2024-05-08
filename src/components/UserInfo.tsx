import React, { FC, useState, useRef, useEffect } from 'react'
import { Avatar, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME, REGISTER_PATHNAME, UPDATE_INFO_PATHNAME } from '../router'

import { USER_TOKEN, REFRESH_USER_TOKEN, USER_INFO, removeToken } from '../utils/local-storage'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)

  const { username, nickName, headPic } = useGetUserInfo() // 从 redux 中获取用户信息

  const trigger = useRef<HTMLButtonElement>(null)
  const pcNav = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!pcNav.current || !trigger.current) return
      if (
        !open ||
        pcNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!open || keyCode !== 27) return
      setOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user 数据
    removeToken(USER_TOKEN) // 清除 token 的存储
    removeToken(REFRESH_USER_TOKEN)
    removeToken(USER_INFO)
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <Link
        to={UPDATE_INFO_PATHNAME}
        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
      >
        <Avatar src={headPic ? `http://localhost:8888/${headPic}` : <UserOutlined />} />
        <span className="ml-1">{nickName}</span>
      </Link>
      <button onClick={logout} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
        退出
      </button>
    </>
  )

  {
    /* Desktop sign in links */
  }

  const Login = (
    <>
      <div>
        <Link
          to={LOGIN_PATHNAME}
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          登陆
        </Link>
      </div>
      <div>
        <Link
          to={REGISTER_PATHNAME}
          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
        >
          注册
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
      </div>
    </>
  )

  return (
    <nav className="hidden md:flex md:grow">
      <div className="justify-end items-center flex-wrap flex grow">
        <a
          className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
          href="features.html"
        >
          Features
        </a>
        <a
          className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
          href="pricing.html"
        >
          Pricing
        </a>
        <a
          className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
          href="blog.html"
        >
          Blog
        </a>
        <a
          className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
          href="about.html"
        >
          About us
        </a>

        <div className="relative">
          <button
            ref={trigger}
            aria-controls="pc-nav"
            aria-expanded={open}
            className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
            onClick={() => setOpen(!open)}
          >
            Support
            <svg
              className="w-3 h-3 fill-current text-gray-500 cursor-pointer ml-1 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
            </svg>
          </button>

          <div
            id="pc-nav"
            ref={pcNav}
            className="origin-top-right bg-white rounded-sm absolute top-full right-0 m-4 w-40 shadow overflow-hidden transition-all duration-300 ease-in-out"
            style={
              open
                ? { maxHeight: pcNav.current?.scrollHeight, opacity: 1 }
                : { maxHeight: 0, opacity: 0.8 }
            }
          >
            <div className="py-2">
              <a
                className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                href="contact.html"
              >
                Contact us
              </a>
              <a
                className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                href="help.html"
              >
                Help center
              </a>
              <a
                className="font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                href="404.html"
              >
                404
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow justify-end flex-wrap items-center">
        {username ? UserInfo : Login}{' '}
      </div>
    </nav>
  )
}

export default UserInfo
