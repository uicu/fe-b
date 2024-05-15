/**
 * @description 作品 - 段落
 */
import { FileTextOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { WorkParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'workParagraph', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: WorkParagraphDefaultProps,
  Icon: FileTextOutlined,
}
