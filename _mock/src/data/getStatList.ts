/**
 * @description 生成统计列表
 */

import Mock from 'mockjs'
import getComponentList from './getComponentList'

const Random = Mock.Random

export default function getStatList(len = 10) {
  const componentList = getComponentList()

  const res = []

  for (let i = 0; i < len; i++) {
    // 一个用户的答卷
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stat: { [key: string]: any } = {
      _id: Random.id(),
    }

    // 增加各个组件的 id value
    componentList.forEach(c => {
      const { fe_id, type, props } = c

      switch (type) {
        case 'workInput':
          stat[fe_id] = Random.ctitle()
          break
        case 'workTextarea':
          stat[fe_id] = Random.ctitle()
          break
        case 'workRadio':
          stat[fe_id] = props?.options?.[0]?.text
          break
        case 'workCheckbox':
          stat[fe_id] = `${props?.list?.[0].text},${props?.list?.[1].text}`
          break
      }
    })

    res.push(stat)
  }

  return res
}
