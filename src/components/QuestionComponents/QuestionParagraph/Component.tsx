import React, { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import QuestionReactQuill from '../../QuestionReactQuill'

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', fe_id = '' } = { ...QuestionParagraphDefaultProps, ...props }
  const editorId = `${fe_id}-text`
  return <QuestionReactQuill value={text} editorId={editorId} id={fe_id} />
}

export default Component
