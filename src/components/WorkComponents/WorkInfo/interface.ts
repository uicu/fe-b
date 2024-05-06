export type WorkInfoPropsType = {
  title?: string
  desc?: string

  // 用于 PropComponent
  onChange?: (newProps: WorkInfoPropsType) => void
  disabled?: boolean
}

export const WorkInfoDefaultProps: WorkInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}
