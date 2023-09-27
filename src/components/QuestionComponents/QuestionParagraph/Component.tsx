import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash-es'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import QuestionReactQuill from '../../QuestionReactQuill'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const Component: FC<QuestionParagraphPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()

  const { text = '', fe_id = '' } = { ...QuestionParagraphDefaultProps, ...props }

  function handleChange(editorProp: string, delta: string) {
    const newProps = { [`${editorProp}`]: delta }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return (
    <QuestionReactQuill
      value={text}
      editorProp="text"
      fe_id={fe_id}
      onChange={debounce(handleChange, 300)}
    />
  )
}

export default Component
