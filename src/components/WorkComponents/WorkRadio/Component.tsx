import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { WorkRadioPropsType, WorkRadioDefaultProps } from './interface'

const { Paragraph } = Typography

const Component: FC<WorkRadioPropsType> = (props: WorkRadioPropsType) => {
  const { title, options = [], value, isVertical } = { ...WorkRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
