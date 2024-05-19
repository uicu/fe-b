import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import WorkTextarea from '../../WorkTextarea'
import { WorkTitlePropsType, WorkTitleDefaultProps } from './interface'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const WorkTitle: FC<WorkTitlePropsType> = (props: WorkTitlePropsType & { fe_id?: string }) => {
  const dispatch = useDispatch()
  const {
    text = '',
    level = 1,
    fe_id = '',
    textAlign = 'left',
  } = { ...WorkTitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return 24
    if (level === 2) return 20
    if (level === 3) return 16
    return 16
  }

  const handleInput = (value: string) => {
    if (value) {
      // 修改值
      const newProps = { text: value }
      dispatch(pushPast())
      dispatch(changeComponentProps({ fe_id, newProps }))
    }
  }

  return (
    <WorkTextarea
      size={genFontSize(level)}
      value={text}
      styles={{
        textAlign: textAlign,
        fontSize: `${genFontSize(level)}px`,
        lineHeight: `${genFontSize(level)}px`,
      }}
      onChange={handleInput}
    />
  )
}

export default WorkTitle
