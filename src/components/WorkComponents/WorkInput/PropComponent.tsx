import React, { FC, useEffect } from 'react'
import { Form, Input, Switch } from 'antd'
import { WorkInputPropsType } from './interface'

const PropComponent: FC<WorkInputPropsType> = (props: WorkInputPropsType) => {
  const { placeholder, required, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ placeholder, required })
  }, [placeholder, required])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ placeholder, required }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="输入框占位符" name="placeholder">
        <Input />
      </Form.Item>
      <Form.Item label="必填" valuePropName="required">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
