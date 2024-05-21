import React, { FC, useEffect } from 'react'
import { Form, Input, Switch } from 'antd'
import { WorkTextareaPropsType } from './interface'
import TextRules from '../../TextRules'

const PropComponent: FC<WorkTextareaPropsType> = (props: WorkTextareaPropsType) => {
  const { placeholder, required, rule, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ placeholder, required, rule })
  }, [placeholder, required, rule])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="horizontal"
      initialValues={{ placeholder, required, rule }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="提示文案"
        name="placeholder"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>

      <Form.Item label="文本格式" name="rule" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
        <TextRules />
      </Form.Item>

      <Form.Item
        label="是否必填"
        valuePropName="required"
        wrapperCol={{ span: 4 }}
        labelCol={{ span: 20 }}
        labelAlign="left"
      >
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
