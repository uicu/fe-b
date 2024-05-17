import React, { FC, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { Typography, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { componentConfGroup, ComponentConfType } from '../../../components/WorkComponents'
import { addComponent, pushPast } from '../../../store/componentsReducer'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { currentPage } = useGetComponentInfo()
  const { title, type, Component, defaultProps, Icon, describe } = c
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    if (currentPage === -1) return
    dispatch(pushPast())
    dispatch(
      addComponent({
        fe_id: nanoid(), // 前端生成的 id
        title,
        type,
        props: defaultProps,
        page: currentPage,
        isHidden: false,
        isLocked: false,
      })
    )
  }, [currentPage])

  return (
    <Popover
      key={type}
      content={
        <>
          <p className={styles.describe}>{describe}</p>
          <div className="hidden lg:block">
            <Component />
          </div>
        </>
      }
      title={title}
      trigger="hover"
      placement="right"
    >
      <div className={styles.item} onClick={handleClick}>
        <div className={styles.component}>
          <Icon />
          {title}
        </div>
      </div>
    </Popover>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div className={styles.wrapper}>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
