/**
 * @description 问卷 标题
 */
import { InfoOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
  Icon: InfoOutlined,
}
