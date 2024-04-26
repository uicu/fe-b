import React, { FC, useRef, useMemo } from 'react'
import { Space, Button, Input, Tooltip, message, Popover, Typography } from 'antd'
import type { InputRef } from 'antd'
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
// import MobileMenu from './MobileMenu'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()

  const { title, status } = useGetPageInfo()
  const isPublished = status === 2

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() // 选中 input 的内容
    document.execCommand('copy') // 拷贝选中内容 （富文本编辑器的操作）
    message.success('拷贝成功')
  }

  // 使用 useMemo 1. 依赖项是否经常变化; 2. 缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null

    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '200px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished])

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <h4 className="text-lg m-0">{title}</h4>

          {LinkAndQRCodeElem}

          <Space>
            <Button onClick={() => nav('/manage/list')}>我的问卷</Button>
            <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
              编辑
            </Button>
          </Space>
        </div>
      </div>
    </header>
  )
}

export default StatHeader
