import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { Typography, Spin, Empty, Row, Divider } from 'antd'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getWorkListService } from '../../services/work'
import WorkCard from '../../components/WorkCard'
import QueryFilter from '../../components/QueryFilter'
import {
  LIST_PAGE_SIZE,
  LIST_SEARCH_CHANNEL,
  LIST_SEARCH_QUANTITY,
  LIST_SEARCH_SORT,
  LIST_SEARCH_STATUS,
  LIST_SEARCH_TIME_SPAN,
  LIST_SEARCH_TITLE,
} from '../../constant/index'

import styles from './common.module.scss'
import CreateWork from '../../components/CreateWork'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')

  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const [pageNo, setPage] = useState(1) // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length // 有没有更多的、为加载完成的数据

  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword
  const title = searchParams.get(LIST_SEARCH_TITLE) || undefined
  const status = searchParams.get(LIST_SEARCH_STATUS) || undefined
  const quantity = searchParams.get(LIST_SEARCH_QUANTITY) || undefined
  const sort = searchParams.get(LIST_SEARCH_SORT) || undefined
  const timeSpan = searchParams.get(LIST_SEARCH_TIME_SPAN) || undefined
  const channel = searchParams.get(LIST_SEARCH_CHANNEL) || undefined

  // 查询条件变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [searchParams])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getWorkListService({
        pageNo,
        pageSize: LIST_PAGE_SIZE,
        title,
        status: status ? Number(status) : undefined,
        quantity,
        sort,
        timeSpan,
        channel,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { works: l = [], totalCount = 0 } = result.data
        setList(list.concat(l)) // 累计
        setTotal(totalCount)
        setPage(pageNo + 1)
      },
    }
  )

  // 尝试去触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  // 1. 当页面加载，或者 url 参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore() // 加载第一页，初始化
  }, [searchParams])

  // 2. 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) // 防抖
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件，重要！！！
    }
  }, [searchParams, haveMoreData])

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className="mb-6 p-6 bg-white rounded">
        <div className={`${styles.header}`}>
          <Title level={3} className={styles.left}>
            我的问卷
          </Title>
          <CreateWork />
        </div>
        <Divider dashed className="m-0" />
        {(() => {
          if (started) {
            return <QueryFilter />
          }
        })()}
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 && (
          <Row gutter={[16, 24]}>
            {list.map(
              (item: {
                coverImg: string
                id: string
                title: string
                isStar: boolean
                status: number
                answerCount: number
              }) => {
                const { id } = item
                return <WorkCard key={id} {...item} />
              }
            )}
          </Row>
        )}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
