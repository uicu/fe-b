export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type WorkCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  // 用于 PropComponent
  onChange?: (newProps: WorkCheckboxPropsType) => void
  disabled?: boolean
}

export const WorkCheckboxDefaultProps: WorkCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
}

// 统计组件的属性类型
export type WorkCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
