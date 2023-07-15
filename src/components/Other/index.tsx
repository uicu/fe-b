import React, { FC } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
// import styles from './index.module.scss'

const onMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e)
}
const items = [
  {
    key: '1',
    label: '设置',
  },
  {
    key: '2',
    label: '分享',
  },
  {
    key: '3',
    label: '统计',
  },
]

const Other: FC = () => {
  return <Dropdown.Button menu={{ items, onClick: onMenuClick }}>其他操作</Dropdown.Button>
}

export default Other
