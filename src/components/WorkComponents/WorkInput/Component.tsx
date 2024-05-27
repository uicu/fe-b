import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from 'antd'
import { debounce } from 'lodash-es'
import WorkReactQuill from '../../WorkReactQuill'
import { WorkInputPropsType, WorkInputDefaultProps } from './interface'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const WorkInput: FC<WorkInputPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()
  const { title = '', placeholder, fe_id = '' } = { ...WorkInputDefaultProps, ...props }

  function handleChange(editorProp: string, delta: string) {
    const newProps = { title: delta }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return (
    <div>
      <WorkReactQuill
        value={title}
        editorProp="title"
        fe_id={fe_id}
        onChange={debounce(handleChange, 300)}
        showBlanks={false}
        strong
      />
      <div className="px-1">
        <Input
          placeholder={placeholder}
          variant="filled"
          value=""
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  )
}

export default WorkInput
