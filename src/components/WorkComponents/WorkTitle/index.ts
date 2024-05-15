/**
 * @description 作品 标题
 */
import { InfoOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { WorkTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'workTitle', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: WorkTitleDefaultProps,
  Icon: InfoOutlined,
}
