/**
 * @description 多选
 */
import { CheckSquareOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { WorkCheckboxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'workCheckbox', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: WorkCheckboxDefaultProps,
  Icon: CheckSquareOutlined,
}
