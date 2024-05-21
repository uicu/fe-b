export type WorkInputPropsType = {
  title?: string
  placeholder?: string
  required?: boolean
  rule?: string
  onChange?: (newProps: WorkInputPropsType) => void
  disabled?: boolean
}

export const WorkInputDefaultProps: WorkInputPropsType = {
  title: '单行输入',
  placeholder: '请输入...',
  required: false,
  rule: 'null',
}
