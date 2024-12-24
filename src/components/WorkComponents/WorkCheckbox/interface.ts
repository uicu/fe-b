export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type WorkCheckboxPropsType = {
  title?: string
  list?: OptionType[]
  required?: boolean
  // 每行显示
  row?: number
  // 用于 PropComponent
  onChange?: (newProps: WorkCheckboxPropsType) => void
  disabled?: boolean
}

export const WorkCheckboxDefaultProps: WorkCheckboxPropsType = {
  title: '多选标题',
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
  required: false,
  row: 24,
}

// 统计组件的属性类型
export type WorkCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
