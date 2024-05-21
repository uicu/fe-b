export type WorkTextareaPropsType = {
  title?: string
  placeholder?: string
  required?: boolean
  rule?: string
  onChange?: (newProps: WorkTextareaPropsType) => void
  disabled?: boolean
}

export const WorkTextareaDefaultProps: WorkTextareaPropsType = {
  title: '多行输入',
  placeholder: '请输入...',
  required: false,
  rule: 'null',
}
