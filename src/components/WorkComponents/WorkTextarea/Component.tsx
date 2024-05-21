import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from 'antd'
import { debounce } from 'lodash-es'
import { WorkTextareaPropsType, WorkTextareaDefaultProps } from './interface'
import WorkReactQuill from '../../WorkReactQuill'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'
const { TextArea } = Input

const WorkTextarea: FC<WorkTextareaPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()
  const { title = '', placeholder, fe_id = '' } = { ...WorkTextareaDefaultProps, ...props }

  function handleChange(editorProp: string, delta: string) {
    const newProps = { title: delta }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return (
    <div>
      <WorkReactQuill
        value={title}
        editorProp="text"
        fe_id={fe_id}
        onChange={debounce(handleChange, 300)}
        showBlanks={false}
        strong
      />
      <div className="px-1">
        <TextArea
          placeholder={placeholder}
          variant="filled"
          value=""
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  )
}

export default WorkTextarea
