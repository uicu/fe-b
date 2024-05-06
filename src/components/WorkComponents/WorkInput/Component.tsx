import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { WorkInputPropsType, WorkInputDefaultProps } from './interface'

const { Paragraph } = Typography

const WorkInput: FC<WorkInputPropsType> = (props: WorkInputPropsType) => {
  const { title, placeholder } = { ...WorkInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default WorkInput
