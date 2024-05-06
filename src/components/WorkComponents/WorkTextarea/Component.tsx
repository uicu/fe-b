import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { WorkTextareaPropsType, WorkTextareaDefaultProps } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input

const WorkTextarea: FC<WorkTextareaPropsType> = (props: WorkTextareaPropsType) => {
  const { title, placeholder } = { ...WorkTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default WorkTextarea
