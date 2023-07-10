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

  const CustomToolbar = useCallback(
    () => (
      <div id="toolbar" className={styles.toolbar}>
        <button className="ql-color"></button>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-video"></button>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
      </div>
    ),
    []
  )

  const modules = {
    toolbar: {
      container: '#toolbar',
      // container: [[{ color: [] }, 'link', 'image', 'video']],
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
    <>
      <CustomToolbar />
      <ReactQuill
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </>
  )
}
export default QuestionReactQuill
