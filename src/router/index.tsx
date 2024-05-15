import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ManageLayout from '../layouts/ManageLayout'
import TemplatesLayout from '../layouts/TemplatesLayout'
import WorkLayout from '../layouts/WorkLayout'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import TemplatesAll from '../pages/templates/All'
import TemplatesPersonal from '../pages/templates/Personal'
// 路由懒加载，拆分 bundle ，优化首页体积
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/work/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/work/Stat'))
import StatOverview from '../pages/work/Stat/StatOverview'
import StatDetails from '../pages/work/Stat/StatDetails'

const router = createBrowserRouter([
  {
    path: 'manage',
    element: <ManageLayout />,
    children: [
      {
        index: true,
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
  {
    path: 'templates',
    element: <TemplatesLayout />,
    children: [
      {
        index: true,
        path: 'all',
        element: <TemplatesAll />,
      },
      {
        path: 'personal',
        element: <TemplatesPersonal />,
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
    path: '*', // 404 路由配置，都写在最后（兜底）
    element: <NotFound />,
  },
])

export default router

// ------------ 分割线 ------------

// 常用的路由常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/auth/signin'
export const REGISTER_PATHNAME = '/auth/signup'
export const RESET_PASSWORD_PATHNAME = '/auth/reset-password'
export const UPDATE_INFO_PATHNAME = '/auth/update'
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
