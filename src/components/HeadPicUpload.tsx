import React, { useState, FC, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import { USER_TOKEN, getToken } from '../utils/local-storage'

interface HeadPicUploadProps {
  value: string
  onChange: (value: string) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const HeadPicUpload: FC<HeadPicUploadProps> = props => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    if (props.value) {
      setImageUrl(`http://localhost:8888/${props.value}`)
    }
  }, [props.value])

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
        props?.onChange(info.file.response.data)
      })
    }
  }

  const uploadButton = (
    <button className="w-full h-full rounded-full border-none bg-white" type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )

  return (
    <Upload
      className="text-center"
      name="file"
      listType="picture-circle"
      showUploadList={false}
      action="http://localhost:8888/v1/user/upload"
      headers={{
        Authorization: `Bearer ${getToken(USER_TOKEN)}`,
      }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" className="w-full h-full rounded-full" />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default HeadPicUpload
