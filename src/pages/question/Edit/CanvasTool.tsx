import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Pagination, Divider, Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changeCurrentPage } from '../../../store/pageInfoReducer'
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
  const { pageTotal, currentPage } = useGetPageInfo()
  const dispatch = useDispatch()

  const onChange = (page: number) => {
    dispatch(changeCurrentPage(page))
  }
  return (
    <div className={styles.tool}>
      <Pagination
        size="small"
        showLessItems
        current={currentPage}
        onChange={onChange}
        total={pageTotal}
        defaultPageSize={1}
      />
      <Divider type="vertical" />
      <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
        <MoreOutlined />
      </Dropdown>
      <Divider type="vertical" />
      <Button
        size="small"
        type={currentPage === -1 ? 'link' : 'text'}
        onClick={() => {
          onChange(-1)
        }}
      >
        结束页
      </Button>
    </div>
  )
}

export default CanvasTool
