import React, { FC } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { DashboardOutlined, ProfileOutlined } from '@ant-design/icons'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import styles from './index.module.scss'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, status } = useGetPageInfo()
  // 是否发布
  const isPublished = status === 2

  // 修改标题
  useTitle(`问卷统计 - ${title}`)

  // Content Elem
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav('/manage/list')}>
                列表
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <NavLink to={`overview`} className={styles.link}>
            <DashboardOutlined className={styles.icon} />
            <p className={styles.label}>数据概览</p>
          </NavLink>
          <NavLink to={`details`} className={styles.link}>
            <ProfileOutlined className={styles.icon} />
            <p className={styles.label}>数据详情</p>
          </NavLink>
        </div>
        <Outlet />
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <div className={styles.content}>{genContentElem()}</div>
        )}
      </div>
    </div>
  )
}

export default Stat
