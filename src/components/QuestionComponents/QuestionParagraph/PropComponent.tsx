import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text })
  }, [text])

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
