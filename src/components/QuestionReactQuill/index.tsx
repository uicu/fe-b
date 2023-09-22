//https://github.com/zenoamaro/react-quill/issues/330
//https://juejin.cn/post/6844904166284869640

import React, { FC, useState, MouseEvent, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import Quill, { blanksHandler, customMatcher, imageHandler } from './customQuill'
import { quillGetHTML } from '../../utils/quill'
import useGetInteractionInfo from '../../hooks/useGetInteractionInfo'
import { changeSelectedId } from '../../store/componentsReducer'
import { changeEditorSelectedId } from '../../store/interactionReducer'
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
  const { editorSelectedId } = useGetInteractionInfo() // 从 redux 中获取editor selected id信息

  const [reactQuillRef, setReactQuillRef] = useState<ReactQuill | null>(null)

  // 自动获得焦点
  useEffect(() => {
    if (!reactQuillRef) return
    reactQuillRef.focus()
  }, [reactQuillRef])

  // 格式白名单
  const formats = ['color', 'link', 'image', 'video', 'blanks', 'alt', 'width', 'height', 'style']

  // 编辑器modules自定义配置
  const modules = {
    clipboard: {
      matchers: [[Node.ELEMENT_NODE, customMatcher]],
    },
    toolbar: {
      container: [[{ color: [] }, 'link', 'image', 'video', 'blanks']],
      handlers: {
        blanks: blanksHandler,
        image: imageHandler,
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
    // 调用父组件change
    onChange?.(editorProp, JSON.stringify(e))
  }

  const handleClick = useCallback((event: MouseEvent) => {
    if (!fe_id) return
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(fe_id))
    dispatch(changeEditorSelectedId(editorId))
  }, [])

  // 初始化值
  let defaultValue
  try {
    // 如果能序列化
    defaultValue = JSON.parse(props.value)
  } catch (error) {
    defaultValue = props.value
  }
  if (editorSelectedId === editorId && fe_id) {
    return (
      <div onClick={e => handleClick(e)}>
        <ReactQuill
          ref={el => {
            setReactQuillRef(el)
          }}
          defaultValue={defaultValue}
          className={styles.editor}
          theme="snow"
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    )
  } else {
    const staticText = quillGetHTML(defaultValue)
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
