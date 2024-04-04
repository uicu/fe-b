import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { Typography, Spin, Empty, Col, Row, Divider, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { getQuestionListService, createQuestionService } from '../../services/question'
import QuestionCard from '../../components/QuestionCard'
import QueryFilter from '../../components/QueryFilter'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'

import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')
  const nav = useNavigate()
  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1) // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length // 有没有更多的、为加载完成的数据

  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result.data
        setList(list.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
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

  // 新建问卷
  const { run: handleCreateClick, loading: disabled } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      const { id } = result.data
      nav(`/question/edit/${id}`)
      message.success('创建成功')
    },
  })

  return (
    <>
      <div className="bg-white rounded mb-6 py-6">
        <div className={`${styles.header} px-6 pb-6`}>
          <Title level={3} className={styles.left}>
            我的问卷
          </Title>
          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={disabled}
          >
            新建
          </Button>
        </div>
        <Divider dashed className="m-0" />
        <QueryFilter />
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 && (
          <Row gutter={[16, 24]}>
            {list.map(
              (item: {
                _id: string
                title: string
                isStar: boolean
                isPublished: boolean
                answerCount: number
                createdAt: string
              }) => {
                const { _id } = item
                const key = `col-${_id}`
                return (
                  <Col
                    key={key}
                    xs={{ flex: '100%' }}
                    sm={{ flex: '50%' }}
                    md={{ flex: '33.33%' }}
                    lg={{ flex: '25%' }}
                  >
                    <QuestionCard key={_id} {...item} />
                  </Col>
                )
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
