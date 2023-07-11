import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import QuestionReactQuill from '../../QuestionReactQuill'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false, fe_id = '' } = { ...QuestionParagraphDefaultProps, ...props }

  const editorId = `${fe_id}-text`
  // 尽量不要使用 dangerouslySetInnerHTML ，不安全

  // const textList = text.split('\n') // 例如 ['hello', '123', '456']

  // return (
  //   <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
  //     {textList.map((t, index) => (
  //       <span key={index}>
  //         {index > 0 && <br />}
  //         {t}
  //       </span>
  //     ))}
  //   </Paragraph>
  // )

  return <QuestionReactQuill value={text} editorId={editorId} id={fe_id} />
}

export default Component
