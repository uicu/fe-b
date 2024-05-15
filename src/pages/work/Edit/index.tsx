import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import classNames from 'classnames'
import useGetInteractionInfo from '../../../hooks/useGetInteractionInfo'
import { changeSelectedId } from '../../../store/componentsReducer'
import { changeEditorSelectedId } from '../../../store/interactionReducer'
import useLoadWorkData from '../../../hooks/useLoadWorkData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import CanvasTool from './CanvasTool'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { editorSelectedId } = useGetInteractionInfo()

  const dispatch = useDispatch()

  const { loading } = useLoadWorkData()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
    dispatch(changeEditorSelectedId(''))
  }

  // 修改标题
  const { title } = useGetPageInfo()
  useTitle(`作品编辑 - ${title}`)

  const containerDefaultClassName = styles.container
  const editorSelectedClassName = styles.selected
  const containerClassName = classNames({
    [containerDefaultClassName]: true,
    [editorSelectedClassName]: !!editorSelectedId,
    'bg-gray-50': true,
  })

  return (
    <div className={containerClassName}>
      <div className={styles.head}>
        <EditHeader />
      </div>
      <div className="bg-white h-20">{/* 导航样式 */}</div>
      <div className="flex-auto py-4 px-4 sm:px-6">
        {/* pc端 */}
        <div className="h-full relative">
          <div className={classNames({ [styles.left]: true, 'hidden lg:block': true })}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className="px-0 pb-3 lg:px-80">
              <CanvasTool />
            </div>
            <div
              className="px-0 lg:px-80 overflow-y-auto overflow-x-hidden"
              style={{ height: 'calc(100% - 60px)' }}
              onClick={clearSelectedId}
            >
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div
            className={classNames({
              [styles.right]: true,
              'hidden lg:block': true,
            })}
          >
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
