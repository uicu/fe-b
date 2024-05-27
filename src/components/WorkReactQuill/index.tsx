// https://github.com/surmon-china/vue-quill-editor/issues/124
// https://github.com/zenoamaro/react-quill/issues/330
// https://juejin.cn/post/6844904166284869640
// https://juejin.cn/post/6968104416784171039
// https://kang-bing-kui.gitbook.io/quill/wen-dang-document/api/events

import React, { FC, useState, MouseEvent, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
import classNames from 'classnames'
import Quill, { blanksHandler, customMatcher, imageHandler } from './customQuill'
import { quillGetHTML } from '../../utils/quill'
import useGetInteractionInfo from '../../hooks/useGetInteractionInfo'
import { changeSelectedId } from '../../store/componentsReducer'
import { changeEditorSelectedId } from '../../store/interactionReducer'
import 'quill/dist/quill.snow.css'
import styles from './index.module.scss'

export type WorkReactQuillPropsType = {
  value: string
  editorProp: string
  fe_id: string
  onChange?: (editorProp: string, delta: string) => void
  showBlanks?: boolean
  showAlign?: boolean
  strong?: boolean
}

const WorkReactQuill: FC<WorkReactQuillPropsType> = (props: WorkReactQuillPropsType) => {
  const { editorProp, fe_id, onChange, showBlanks = true, strong = false, showAlign = true } = props
  const editorId = `${fe_id}-${editorProp}`

  const dispatch = useDispatch()
  const { editorSelectedId } = useGetInteractionInfo() // 从 redux 中获取editor selected id信息

  const [reactQuillRef, setReactQuillRef] = useState<ReactQuill | null>(null)

  useEffect(() => {
    if (reactQuillRef && reactQuillRef.editor) {
      const { editor } = reactQuillRef
      // 自动获得焦点
      editor.focus()
      // 修改placeholder
      const tooltip = (editor as any).theme.tooltip
      const inputLink = tooltip.root.querySelector('input[data-link]')
      inputLink.dataset.link = 'www.link.com'

      const inputVideo = tooltip.root.querySelector('input[data-video]')
      inputVideo.dataset.video = 'www.video.com'
    }
  }, [reactQuillRef])

  // 格式白名单
  const formats = [
    'color',
    'align',
    'link',
    'image',
    'video',
    'blanks',
    'alt',
    'width',
    'height',
    'style',
    'id',
  ]

  // 展示那些tool
  const container: Array<string | { color: never[] } | { align: string[] }> = [
    { color: [] },
    'link',
    'image',
    'video',
  ]

  if (showBlanks) {
    container.push('blanks')
  }
  if (showAlign) {
    container.push({ align: ['', 'right', 'center'] })
  }

  // 编辑器modules自定义配置
  const modules = {
    clipboard: {
      matchers: [[Node.ELEMENT_NODE, customMatcher]],
    },
    toolbar: {
      container: [...container],
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
      <div
        onClick={e => handleClick(e)}
        className={classNames({ [styles.editor]: true, [styles.strong]: strong })}
      >
        <ReactQuill
          ref={el => {
            setReactQuillRef(el)
          }}
          defaultValue={defaultValue}
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
        className={classNames({
          [styles.static]: true,
          'ql-editor': true,
          [styles.strong]: strong,
        })}
        onClick={e => handleClick(e)}
        dangerouslySetInnerHTML={{ __html: staticText }}
      />
    )
  }
}
export default WorkReactQuill
