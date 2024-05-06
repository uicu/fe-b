import Koa from 'koa'
import Mock from 'mockjs'
import getWorkList from './data/getWorkList'
import getComponentList from './data/getComponentList'

const Random = Mock.Random

export default [
  {
    // 获取单个问卷信息
    url: '/api/work/:id',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          desc: '问卷描述',
          js: '',
          css: '',
          isDeleted: false,
          isPublished: true,
          pageTotal: 3,
          componentList: getComponentList(),
        },

        // errno: 1002,
        // msg: '错误测试'
      }
    },
  },
  {
    // 创建问卷
    url: '/api/work',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      }
    },
  },
  {
    // 获取（查询）问卷列表
    url: '/api/work',
    method: 'get',
    response(ctx: Koa.BaseContext) {
      const { url = '', query = { pageSize: 10 } } = ctx
      const isDeleted = url.indexOf('isDeleted=true') >= 0
      const isStar = url.indexOf('isStar=true') >= 0
      const pageSize = parseInt(query.pageSize as string) || 10

      return {
        errno: 0,
        data: {
          list: getWorkList({ len: pageSize, isDeleted, isStar }), // 当前页
          total: 100, // 总数，用于分页
        },
      }
    },
  },
  {
    // 更新问卷
    url: '/api/work/:id',
    method: 'patch',
    response() {
      return {
        errno: 0,
      }
    },
  },
  {
    // 复制问卷
    url: '/api/work/duplicate/:id',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      }
    },
  },
  {
    // 批量彻底删除
    url: '/api/work',
    method: 'delete',
    response() {
      return {
        errno: 0,
      }
    },
  },
]
