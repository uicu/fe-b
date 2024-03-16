import React, { FC } from 'react'
import { Avatar, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../router'

import { USER_TOKEN, REFRESH_USER_TOKEN, USER_INFO, removeToken } from '../utils/local-storage'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { username, nickname } = useGetUserInfo() // 从 redux 中获取用户信息

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
      <Link to="/" className="text-white">
        <Avatar src={url ? url : <UserOutlined />} />
        <span className="ml-1">{nickname}</span>
      </Link>
      <button onClick={logout} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
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
          className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
        >
          登陆
        </Link>
      </div>
      <div>
        <Link
          to={REGISTER_PATHNAME}
          className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
        >
          注册
        </Link>
      </div>
    </>
  )

  return (
    <nav className="hidden md:flex md:grow">
      <div className="flex grow justify-end flex-wrap items-center">
        {username ? UserInfo : Login}{' '}
      </div>
    </nav>
  )
}

export default UserInfo
