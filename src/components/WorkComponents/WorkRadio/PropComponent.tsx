import React, { FC, useEffect } from 'react'
import { Form, Switch, Select } from 'antd'
import { WorkRadioPropsType } from './interface'

const PropComponent: FC<WorkRadioPropsType> = (props: WorkRadioPropsType) => {
  const { title, required, row, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, required, row })
  }, [title, required, row])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="horizontal"
      initialValues={{ title, required, row }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="每行显示" name="row">
        <Select
          options={[
            { value: 24, label: '一列' },
            { value: 12, label: '二列' },
            { value: 8, label: '三列' },
            { value: 6, label: '四列' },
          ]}
        />
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
