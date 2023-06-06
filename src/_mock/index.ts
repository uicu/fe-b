import Koa from 'koa'
import Router from 'koa-router'
import mockList from './src/index'

type Method = 'get' | 'put' | 'post' | 'patch' | 'delete' | 'del'

const app = new Koa()
const router = new Router()

async function getRes(
  fn: (ctx: Koa.BaseContext) => { errno: number; data?: { [key: string]: unknown } },
  ctx: Koa.BaseContext
) {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 1000)
  })
}

// 注册 mock 路由
mockList.forEach(item => {
  const { url, method, response } = item
  router[method as Method](url, async (ctx: Koa.BaseContext) => {
    // const res = response()
    const res = await getRes(response, ctx) // 模拟网络请求的加载状态，1s
    ctx.body = res // 输入结果
  })
})

app.use(router.routes())
app.listen(3001) // port 端口
