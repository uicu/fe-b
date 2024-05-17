import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_TITLE } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState('')
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  // 获取 url 参数，并设置到 input value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_TITLE) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    if (value) {
      nav({
        pathname,
        search: `${LIST_SEARCH_TITLE}=${value}`,
      })
    } else {
      nav({
        pathname,
      })
    }
  }

  return (
    <Search
      allowClear
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '160px' }}
    />
  )
}

export default ListSearch
