import React, { FC } from 'react'
import { Typography, Space, Checkbox } from 'antd'
import { WorkCheckboxDefaultProps, WorkCheckboxPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<WorkCheckboxPropsType> = (props: WorkCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...WorkCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, text, checked } = opt
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
