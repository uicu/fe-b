import React, { FC, useRef, useEffect } from 'react'
import style from './index.module.scss'

const WorkTextarea: FC<{
  size: number
  value: string
  styles: Record<string, unknown>
  onChange: (value: string) => void
}> = props => {
  const { size, value, styles, onChange } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const currentRows = (textarea.value.match(/\n/g) || []).length + 1
      textarea.style.minHeight = `${size}px`
      textarea.style.height = `${currentRows * size}px`
      textarea.addEventListener('input', handleInput)
      return () => {
        textarea.removeEventListener('input', handleInput)
      }
    }
  }, [size])

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      // 设置高度为滚动高度
      const currentRows = (textarea.value.match(/\n/g) || []).length + 1
      textarea.style.height = `${currentRows * size}px`
      // 修改值
      onChange(textarea.value)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      className={style.textarea}
      defaultValue={value}
      placeholder="请输入标题"
      style={styles}
    />
  )
}

export default WorkTextarea
