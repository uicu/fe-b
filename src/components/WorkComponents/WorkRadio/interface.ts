export type OptionType = {
  value: string
  text: string
}

export type WorkRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  // 用于 PropComponent
  onChange?: (newProps: WorkRadioPropsType) => void
  disabled?: boolean
}

export const WorkRadioDefaultProps: WorkRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
}

// 统计组件的属性类型
export type WorkRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
