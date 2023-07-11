export type QuestionParagraphPropsType = {
  text?: string
  // 用于 PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
}
