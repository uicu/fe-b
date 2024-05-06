import type { FC } from 'react'
import WorkInputConf, { WorkInputPropsType } from './WorkInput'
import WorkTitleConf, { WorkTitlePropsType } from './WorkTitle'
import WorkParagraphConf, { WorkParagraphPropsType } from './WorkParagraph'
import WorkInfoConf, { WorkInfoPropsType } from './WorkInfo'
import WorkTextareaConf, { WorkTextareaPropsType } from './WorkTextarea'
import WorkRadioConf, { WorkRadioPropsType, WorkRadioStatPropsType } from './WorkRadio'
import WorkCheckboxConf, { WorkCheckboxPropsType, WorkCheckboxStatPropsType } from './WorkCheckbox'

// 统一，各个组件的 prop type
export type ComponentPropsType = WorkInputPropsType &
  WorkTitlePropsType &
  WorkParagraphPropsType &
  WorkInfoPropsType &
  WorkTextareaPropsType &
  WorkRadioPropsType &
  WorkCheckboxPropsType

// 统一，各个组件的统计属性类型
type ComponentStatPropsType = WorkRadioStatPropsType & WorkCheckboxStatPropsType

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string
  type: string
  describe: string
  Component: FC<ComponentPropsType & { fe_id?: string }>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatComponent?: FC<ComponentStatPropsType>
  Icon: FC
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  WorkInputConf,
  WorkTitleConf,
  WorkParagraphConf,
  WorkInfoConf,
  WorkTextareaConf,
  WorkRadioConf,
  WorkCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [WorkInfoConf, WorkTitleConf, WorkParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [WorkInputConf, WorkTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [WorkRadioConf, WorkCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
