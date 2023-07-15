import React, { FC, useState } from 'react'
import { Pagination, Divider, Dropdown, Button } from 'antd'
import type { PaginationProps, MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import styles from './CanvasTool.module.scss'

const onClick: MenuProps['onClick'] = e => {
  console.log('click', e)
}

const items = [
  {
    key: '1',
    label: '删除',
  },
  {
    key: '2',
    label: '前移',
  },
  {
    key: '3',
    label: '后移',
  },
  {
    key: '4',
    label: '复制',
  },
  {
    key: '5',
    label: '新增',
  },
]

const CanvasTool: FC = () => {
  const [current, setCurrent] = useState(1)

  const onChange: PaginationProps['onChange'] = page => {
    console.log(page)
    setCurrent(page)
  }
  return (
    <div className={styles.tool}>
      <Pagination simple current={current} onChange={onChange} total={5} pageSize={1} />
      <Divider type="vertical" />
      <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
        <MoreOutlined />
      </Dropdown>
      <Divider type="vertical" />
      <Button size="small" type="text">
        结束页
      </Button>
    </div>
  )
}

export default CanvasTool
