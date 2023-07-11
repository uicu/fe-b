import React, { FC, useState, MouseEvent, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import { quillGetHTML } from '../../utils/quill'
import useGetEditorInfo from '../../hooks/useGetEditorInfo'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../store/componentsReducer'
import { changeEditorSelectedId } from '../../store/editorReducer'
import 'quill/dist/quill.snow.css'
import styles from './index.module.scss'

export type QuestionReactQuillPropsType = {
  value: string
  editorId: string
  id: string
}

const QuestionReactQuill: FC<QuestionReactQuillPropsType> = (
  props: QuestionReactQuillPropsType
) => {
  const { editorId, id } = props

  const dispatch = useDispatch()
  const { editorSelectedId } = useGetEditorInfo() // 从 redux 中获取editor信息

  const [value, setValue] = useState<DeltaStatic>(props.value as unknown as DeltaStatic)
  const [reactQuillRef, setReactQuillRef] = useState<ReactQuill | null>(null)

  useEffect(() => {
    if (!reactQuillRef) return
    reactQuillRef.focus()
  }, [reactQuillRef])

  // 编辑器modules自定义配置
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

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
    dispatch(changeEditorSelectedId(editorId))
  }, [])

  if (editorSelectedId === editorId) {
    return (
      <ReactQuill
        ref={el => {
          setReactQuillRef(el)
        }}
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    )
  } else {
    const staticText = quillGetHTML(value)
    return (
      <div
        onClick={e => handleClick(e)}
        className={styles.static}
        dangerouslySetInnerHTML={{ __html: staticText }}
      />
    )
  }
}
export default QuestionReactQuill
