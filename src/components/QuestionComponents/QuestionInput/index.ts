/**
 * @description 问卷 输入框
 */
import { EditOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input 组件的配置
export default {
  title: '单行输入',
  type: 'questionInput', // 要和后端统一好
  describe: '描述',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps,
  Icon: EditOutlined,
}
