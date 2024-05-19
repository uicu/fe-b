/**
 * @description 作品 info 组件
 */
import { InfoCircleOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { WorkInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '作品标题',
  type: 'workInfo',
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: WorkInfoDefaultProps,
  Icon: InfoCircleOutlined,
}
