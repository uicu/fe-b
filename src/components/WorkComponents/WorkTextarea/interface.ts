export type WorkTextareaPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: WorkTextareaPropsType) => void
  disabled?: boolean
}

export const WorkTextareaDefaultProps: WorkTextareaPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
}
