import React, { FC, useState } from 'react'
import { Dropdown, Modal, Upload, message } from 'antd'
import type { MenuProps, UploadProps, GetProp } from 'antd'
import { ContainerOutlined, InboxOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import Cookie from 'js-cookie'
import { exportAnswerOrTemplate } from '../../../../services/stat'
import useGetPageInfo from '../../../../hooks/useGetPageInfo'

const { Dragger } = Upload

type PropsType = {
  id: string
  onUploadDone: () => void
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const Import: FC<PropsType> = (props: PropsType) => {
  const { id, onUploadDone } = props
  const [messageApi, contextHolder] = message.useMessage()
  // 打开对话框
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 是否上传成功
  const [uploadDone, setUploadDone] = useState(false)

  // 上传组件配置
  const propsUpload: UploadProps = {
    name: 'file',
    multiple: false,
    action: `http://localhost:8888/v1/stat/import/${id}`,
    headers: {
      Authorization: `Bearer ${Cookie.get('USER_TOKEN')}`,
    },
    beforeUpload: (file: FileType) => {
      const isCsv = file.type === 'text/csv'
      if (!isCsv) {
        messageApi.error('您只能上传 CSV 文件')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        messageApi.error('CSV必须小于5MB！')
        return false
      }
      return isCsv && isLt2M
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        messageApi.success(`${info.file.name} 文件上传成功`)
        setUploadDone(true)
      } else if (status === 'error') {
        messageApi.error(`${info.file.name} 文件上传失败`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  // 导出模版
  const { title } = useGetPageInfo()
  const { run: handelExportTemplate } = useRequest(
    async () => {
      const data = await exportAnswerOrTemplate(id, 'template')
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const url = window.URL.createObjectURL(new Blob([result], { type: 'text/csv' }))
        const a = document.createElement('a')
        a.href = url
        a.download = `${title}-模版.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      },
    }
  )

  const handleCancel = () => {
    setIsModalOpen(false)
    if (uploadDone) {
      // 刷新列表
      onUploadDone()
    }
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e)
    setIsModalOpen(true)
  }

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === 'template') {
      handelExportTemplate()
    }
  }
  const items: MenuProps['items'] = [
    {
      label: '下载模版',
      key: 'template',
      icon: <ContainerOutlined />,
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  return (
    <div>
      {contextHolder}
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        导入
      </Dropdown.Button>
      <Modal title="导入答案" open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件至此区域即可上传</p>
          <p className="ant-upload-hint">支持单次上传，严禁上传公司数据或其他禁止的文件</p>
        </Dragger>
      </Modal>
    </div>
  )
}

export default Import
