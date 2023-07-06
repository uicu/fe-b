/**
 * @description 问卷 checkbox
 */
import { InfoOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  Icon: InfoOutlined,
}
