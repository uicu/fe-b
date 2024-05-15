/**
 * @description 作品 radio
 */
import { CheckCircleOutlined } from '@ant-design/icons'
import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { WorkRadioDefaultProps } from './interface'

export * from './interface'

export default {
  title: '单选',
  type: 'workRadio',
  describe:
    '单选是指从一组选项中，选出一个作为正确（或比较合适）的答案。在市场调查、教学测试、活动投票等多种场景，经常使用单选题这种形式。',
  Component,
  PropComponent,
  defaultProps: WorkRadioDefaultProps,
  StatComponent,
  Icon: CheckCircleOutlined,
}
