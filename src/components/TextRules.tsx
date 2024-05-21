import React, { FC } from 'react'
import { Select } from 'antd'

interface PropsType {
  id?: string
  value?: string
  onChange?: (value: string) => void
}

const TextRules: FC<PropsType> = props => {
  const { id, value, onChange } = props
  return (
    <Select
      id={id}
      defaultValue={value}
      onChange={onChange}
      options={[
        { value: 'null', label: '不限格式' },
        { value: 'num', label: '数字' },
        { value: 'date', label: '日期' },
        { value: 'email', label: '电子邮件' },
        { value: 'chinese', label: '中文' },
        { value: 'english', label: '英文' },
        { value: 'url', label: '网址' },
        { value: 'idCard', label: '身份证号码(限大陆地区)' },
        { value: 'qq', label: 'QQ号码' },
        { value: 'mobile', label: '手机号码(限大陆地区)' },
        { value: 'phone', label: '电话号码(限大陆地区)' },
      ]}
    />
  )
}

export default TextRules

// const numRegex = /^\d+$/
// const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// const chineseRegex = /^[\u4e00-\u9fa5]+$/
// const englishRegex = /^[a-zA-Z]+$/
// const urlRegex = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/
// const idCardRegex =
//   /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// const qqRegex = /^[1-9][0-9]{4,10}$/
// const mobileRegex = /^1[3-9]\d{9}$/
// const phoneRegex = /^0\d{2,3}-?\d{7,8}$/
