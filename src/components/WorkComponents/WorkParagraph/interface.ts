export type WorkParagraphPropsType = {
  text?: string
  // 用于 PropComponent
  onChange?: (newProps: WorkParagraphPropsType) => void
  disabled?: boolean
}

export const WorkParagraphDefaultProps: WorkParagraphPropsType = {
  text: '一行段落',
}
