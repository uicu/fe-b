import getStatList from './data/getStatList'

export default [
  // 答卷列表
  {
    url: '/api/stat/:workId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          total: 100, // 分页
          list: getStatList(),
        },
      }
    },
  },
  // 获取单个组件的统计数据汇总
  {
    url: '/api/stat/:workId/:componentId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          stat: [
            { name: '选项1', count: 20 },
            { name: '选项2', count: 10 },
            { name: '选项3', count: 25 },
          ],
        },
      }
    },
  },
]
