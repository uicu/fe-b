import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { WorkInfoPropsType, WorkInfoDefaultProps } from './interface'
import WorkTextarea from '../../WorkTextarea'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const Component: FC<WorkInfoPropsType> = (props: WorkInfoPropsType & { fe_id?: string }) => {
  const dispatch = useDispatch()
  const {
    title = '',
    desc = '',
    fe_id = '',
    textAlign = 'center',
  } = { ...WorkInfoDefaultProps, ...props }

  const handleTitle = (value: string) => {
    if (value) {
      const newProps = { title: value }
      dispatch(pushPast())
      dispatch(changeComponentProps({ fe_id, newProps }))
    }
  }

  const handleDesc = (value: string) => {
    if (value) {
      const newProps = { desc: value }
      dispatch(pushPast())
      dispatch(changeComponentProps({ fe_id, newProps }))
    }
  }

  return (
    <div>
      <WorkTextarea
        size={24}
        value={title}
        styles={{
          textAlign: textAlign,
          fontSize: '24px',
          lineHeight: '24px',
          fontWeight: 600,
        }}
        onChange={handleTitle}
      />
      <WorkTextarea
        size={14}
        value={desc}
        styles={{
          textAlign: textAlign,
          fontSize: '14px',
          lineHeight: '14px',
        }}
        onChange={handleDesc}
      />
    </div>
  )
}

export default Component
