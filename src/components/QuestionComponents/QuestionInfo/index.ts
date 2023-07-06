/**
 * @description 问卷 info 组件
 */
import { InfoOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
  Icon: InfoOutlined,
}
