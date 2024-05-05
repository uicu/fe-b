import React, { FC } from 'react'
import { Button, Popconfirm } from 'antd'
import { useRequest } from 'ahooks'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteAnswers } from '../../../../services/stat'

type PropsType = {
  id: string
  disabled: boolean
  selectedRowKeys: React.Key[]
  onUploadDone: (initPageNo: boolean) => void
}

const Delete: FC<PropsType> = (props: PropsType) => {
  const { id, disabled, selectedRowKeys, onUploadDone } = props

  // 批量删除
  const { loading, run: deleteAnswer } = useRequest(
    async () => {
      const data = await deleteAnswers(id, selectedRowKeys as number[])
      return data
    },
    {
      manual: true,
      onSuccess() {
        onUploadDone(false)
      },
    }
  )

  return (
    <Popconfirm
      placement="bottomRight"
      title="确定删除答案？"
      description={'此操作会将目前列表所选的答案删除'}
      okText="确定"
      cancelText="取消"
      onConfirm={deleteAnswer}
    >
      <Button icon={<DeleteOutlined />} disabled={disabled || loading} />
    </Popconfirm>
  )
}

export default Delete
