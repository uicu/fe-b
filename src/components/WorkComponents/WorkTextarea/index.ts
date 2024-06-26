/**
 * @description 作品 多行输入
 */
import { FormOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { WorkTextareaDefaultProps } from './interface'

export * from './interface'

// Textarea 组件的配置
export default {
  title: '多行输入',
  type: 'workTextarea', // 要和后端统一好
  describe: '描述',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: WorkTextareaDefaultProps,
  Icon: FormOutlined,
}
