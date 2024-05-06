import React, { FC } from 'react'
import { Button } from 'antd'
import { useRequest } from 'ahooks'
import { exportAnswerOrTemplate } from '../../../../services/stat'
import useGetPageInfo from '../../../../hooks/useGetPageInfo'

type PropsType = {
  id: string
}

const Export: FC<PropsType> = (props: PropsType) => {
  const { id } = props

  // 导出答案
  const { title } = useGetPageInfo()
  const { run: handelExportAnswer } = useRequest(
    async () => {
      const data = await exportAnswerOrTemplate(id, 'answer')
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const url = window.URL.createObjectURL(new Blob([result], { type: 'text/csv' }))
        const a = document.createElement('a')
        a.href = url
        a.download = `${title}-${new Date().getTime()}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      },
    }
  )

  return (
    <Button
      type="primary"
      onClick={() => {
        handelExportAnswer()
      }}
    >
      导出
    </Button>
  )
}

export default Export
