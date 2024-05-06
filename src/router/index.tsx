import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import WorkLayout from '../layouts/WorkLayout'
import Home from '../pages/home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import UpdateInfo from '../pages/UpdateInfo'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import Demo from '../pages/demo'
// 路由懒加载，拆分 bundle ，优化首页体积
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/work/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/work/Stat'))
import StatOverview from '../pages/work/Stat/StatOverview'
import StatDetails from '../pages/work/Stat/StatDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'update-info',
        element: <UpdateInfo />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
    ],
  },

  {
    path: 'work',
    element: <WorkLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
        children: [
          {
            path: 'overview',
            element: <StatOverview />,
          },
          {
            path: 'details',
            element: <StatDetails />,
          },
        ],
      },
    ],
  },
  {
    path: 'demo',
    element: <Demo />,
  },
  {
    path: '*', // 404 路由配置，都写在最后（兜底）
    element: <NotFound />,
  },
])

export default router

// ------------ 分割线 ------------

// 常用的路由常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const RESET_PASSWORD_PATHNAME = '/reset-password'
export const UPDATE_INFO_PATHNAME = '/update-info'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if (
    [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME, RESET_PASSWORD_PATHNAME].includes(pathname)
  ) {
    return true
  }

  return false
}
