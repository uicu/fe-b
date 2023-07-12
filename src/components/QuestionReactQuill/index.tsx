import React, { FC, useState, MouseEvent, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import Quill, { blanksHandler } from './customQuill'
import { quillGetHTML } from '../../utils/quill'
import useGetEditorInfo from '../../hooks/useGetEditorInfo'
import { changeSelectedId } from '../../store/componentsReducer'
import { changeEditorSelectedId } from '../../store/editorReducer'
import 'quill/dist/quill.snow.css'
import styles from './index.module.scss'

export type QuestionReactQuillPropsType = {
  value: string
  editorProp: string
  fe_id: string
  onChange?: (editorProp: string, delta: string) => void
}

const QuestionReactQuill: FC<QuestionReactQuillPropsType> = (
  props: QuestionReactQuillPropsType
) => {
  const { editorProp, fe_id, onChange } = props
  const editorId = `${fe_id}-${editorProp}`

  const dispatch = useDispatch()
  const { editorSelectedId } = useGetEditorInfo() // 从 redux 中获取editor信息

  const [value, setValue] = useState<DeltaStatic | string>('')
  const [reactQuillRef, setReactQuillRef] = useState<ReactQuill | null>(null)

  // 初始化值
  useEffect(() => {
    try {
      // 如果能序列化
      const initValue = JSON.parse(props.value)
      setValue(initValue)
    } catch (error) {
      setValue(props.value)
    }
  }, [props.value])

  // 自动获得焦点
  useEffect(() => {
    if (!reactQuillRef) return
    reactQuillRef.focus()
  }, [reactQuillRef])

  // 格式白名单
  const formats = ['color', 'link', 'image', 'video', 'blanks']

  // 编辑器modules自定义配置
  const modules = {
    toolbar: {
      container: [[{ color: [] }, 'link', 'image', 'video', 'blanks']],
      handlers: {
        blanks: blanksHandler,
      },
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      // 先不要Toolbar这个图片位置调整的按钮，下次初始化编辑的时候会导致style样式丢失
      // modules: ['Resize', 'DisplaySize', 'Toolbar']
      modules: ['Resize', 'DisplaySize'],
    },
  }

  function handleChange(
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) {
    const e = editor.getContents()
    setValue(e)

    // 调用父组件change
    onChange?.(editorProp, JSON.stringify(e))
  }

  const handleClick = useCallback((event: MouseEvent) => {
    if (!fe_id) return
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(fe_id))
    dispatch(changeEditorSelectedId(editorId))
  }, [])

  if (editorSelectedId === editorId && fe_id) {
    return (
      <div onClick={e => handleClick(e)}>
        <ReactQuill
          ref={el => {
            setReactQuillRef(el)
          }}
          className={styles.editor}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
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
