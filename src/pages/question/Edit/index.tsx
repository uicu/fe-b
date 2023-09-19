import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import classNames from 'classnames'
import useGetInteractionInfo from '../../../hooks/useGetInteractionInfo'
import { changeSelectedId } from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import CanvasTool from './CanvasTool'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { editorSelectedId } = useGetInteractionInfo()
  // const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading } = useLoadQuestionData()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))
  }

  // 修改标题
  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}`)

  const containerDefaultClassName = styles.container
  const editorSelectedClassName = styles.selected
  const containerClassName = classNames({
    [containerDefaultClassName]: true,
    [editorSelectedClassName]: !!editorSelectedId,
  })

  return (
    <div className={containerClassName}>
      <div className={styles.head}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-tool']}>
              <CanvasTool />
            </div>
            <div className={styles['canvas-wrapper']} onClick={clearSelectedId}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
