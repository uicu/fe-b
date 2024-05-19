import React, { FC, useEffect } from 'react'
import { Form, Select } from 'antd'
import { WorkTitlePropsType } from './interface'

const PropComponent: FC<WorkTitlePropsType> = (props: WorkTitlePropsType) => {
  const { level, textAlign, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      level,
      textAlign,
    })
  }, [level, textAlign])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ level, textAlign }}
      disabled={disabled}
    >
      <Form.Item label="字体大小" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="对齐方式" name="textAlign">
        <Select
          options={[
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' },
          ]}
        ></Select>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
