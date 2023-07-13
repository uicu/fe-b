import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import QuestionReactQuill from '../../QuestionReactQuill'
import { changeComponentProps } from '../../../store/componentsReducer'

const Component: FC<QuestionParagraphPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()

  const { text = '', fe_id = '' } = { ...QuestionParagraphDefaultProps, ...props }

  function handleChange(editorProp: string, delta: string) {
    const newProps = { [`${editorProp}`]: delta }
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return <QuestionReactQuill value={text} editorProp="text" fe_id={fe_id} onChange={handleChange} />
}

export default Component
