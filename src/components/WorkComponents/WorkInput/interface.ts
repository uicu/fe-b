export type WorkInputPropsType = {
  title?: string
  placeholder?: string
  required?: boolean
  onChange?: (newProps: WorkInputPropsType) => void
  disabled?: boolean
}

export const WorkInputDefaultProps: WorkInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
  required: false,
}
