import Mock from 'mockjs'

const Random = Mock.Random

export default [
  {
    url: '/api/test',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      }
    },
  },
]
