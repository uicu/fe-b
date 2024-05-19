import React, { FC, useEffect } from 'react'
import { Form, Select } from 'antd'
import { WorkInfoPropsType } from './interface'

const PropComponent: FC<WorkInfoPropsType> = (props: WorkInfoPropsType) => {
  const { textAlign, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      textAlign,
    })
  }, [textAlign])

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
      initialValues={{ textAlign }}
      disabled={disabled}
    >
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
