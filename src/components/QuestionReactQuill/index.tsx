import React, { FC, useState, useEffect, useCallback } from 'react'
import ReactQuill from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import 'quill/dist/quill.snow.css'
import styles from './index.module.scss'

export type QuestionReactQuillPropsType = {
  value: string
}

const QuestionReactQuill: FC<QuestionReactQuillPropsType> = (
  props: QuestionReactQuillPropsType
) => {
  const [value, setValue] = useState<DeltaStatic>(props.value as unknown as DeltaStatic)
  const modules = {
    toolbar: {
      container: [[{ color: [] }, 'link', 'image', 'video']],
    },
  }

  function onChange(
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) {
    const e = editor.getContents()
    setValue(e)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <ReactQuill
      className={styles.editor}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  )
}
export default QuestionReactQuill
