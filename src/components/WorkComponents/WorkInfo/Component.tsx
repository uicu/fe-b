import React, { FC } from 'react'
import { Typography } from 'antd'
import { WorkInfoPropsType, WorkInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const Component: FC<WorkInfoPropsType> = (props: WorkInfoPropsType) => {
  const { title, desc = '' } = { ...WorkInfoDefaultProps, ...props }

  const descTextList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default Component
