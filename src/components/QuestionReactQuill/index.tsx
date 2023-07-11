import React, { FC, useState, MouseEvent, KeyboardEvent, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import ImageResize from 'quill-image-resize-module-react'
import { quillGetHTML } from '../../utils/quill'
import useGetEditorInfo from '../../hooks/useGetEditorInfo'
import { changeSelectedId } from '../../store/componentsReducer'
import { changeEditorSelectedId } from '../../store/editorReducer'
import 'quill/dist/quill.snow.css'
import styles from './index.module.scss'

export type QuestionReactQuillPropsType = {
  value: string
  editorId: string
  id: string
}

/*
   插件内部选中图片按删除键的时候导致以下报错（报错的原因是里面写了window.Quill.find）：
    Uncaught TypeError: Cannot read property 'find' of undefined
      at HTMLDocument.checkImage (image-resize.min.js:formatted:1)
   因此重写 ImageResize 模块里的checkImage 方法
*/
class PlainResize extends ImageResize {
  checkImage = (event: KeyboardEvent) => {
    if (this.img) {
      if (event.keyCode === 46 || event.keyCode === 8) {
        Quill.find(this.img).deleteAt(0)
      }
      this.hide()
    }
  }
}

Quill.register('modules/imageResize', PlainResize)

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
    imageResize: {
      parchment: Quill.import('parchment'),
      // 先不要Toolbar这个图片位置调整的按钮，下次初始化编辑的时候会导致style样式丢失
      // modules: ['Resize', 'DisplaySize', 'Toolbar']
      modules: ['Resize', 'DisplaySize'],
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
    if (!id) return
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
    dispatch(changeEditorSelectedId(editorId))
  }, [])

  if (editorSelectedId === editorId && id) {
    return (
      <div onClick={e => handleClick(e)}>
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
