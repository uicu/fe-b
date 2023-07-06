/**
 * @description 问卷 - 段落
 */
import { InfoOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  describe: '描述',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
  Icon: InfoOutlined,
}
