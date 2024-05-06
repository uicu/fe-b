import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash-es'
import { WorkParagraphPropsType, WorkParagraphDefaultProps } from './interface'
import WorkReactQuill from '../../WorkReactQuill'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const Component: FC<WorkParagraphPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()

  const { text = '', fe_id = '' } = { ...WorkParagraphDefaultProps, ...props }

  function handleChange(editorProp: string, delta: string) {
    const newProps = { [`${editorProp}`]: delta }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return (
    <WorkReactQuill
      value={text}
      editorProp="text"
      fe_id={fe_id}
      onChange={debounce(handleChange, 300)}
    />
  )
}

export default Component
