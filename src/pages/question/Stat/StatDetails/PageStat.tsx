import React, { FC, useState } from 'react'
import {
  Spin,
  Table,
  Pagination,
  Card,
  Flex,
  Button,
  Space,
  Typography,
  Divider,
  Tooltip,
} from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getQuestionStatAverageTimeService,
  getQuestionStatListService,
  exportAnswer,
} from '../../../../services/stat'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../../constant'
import { timeConversion } from '../../../../utils/time'
import useGetPageInfo from '../../../../hooks/useGetPageInfo'
const { Text } = Typography

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { id = '' } = useParams()

  const [averageTime, setAverageTime] = useState('')

  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  // 加载列表
  const { loading, run: runGetQuestionStatListService } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { pageNo, pageSize })
      return res
    },
    {
      refreshDeps: [id, pageNo, pageSize],
      onSuccess(res) {
        const { totalCount, answer = [] } = res.data
        setTotal(totalCount)
        setList(answer)
      },
    }
  )

  // 加载平均完成时间
  const { loading: loadingAverageTime, run: runGetQuestionStatAverageTimeService } = useRequest(
    async () => {
      const res = await getQuestionStatAverageTimeService(id)
      return res
    },
    {
      refreshDeps: [id],
      onSuccess(res) {
        const { averageDuration } = res.data
        setAverageTime(timeConversion(Math.floor(Number(averageDuration))))
      },
    }
  )

  // 导出答案
  const { title } = useGetPageInfo()
  const { run: handelExportAnswer } = useRequest(
    async () => {
      const data = await exportAnswer(id)
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

  // 刷新
  const handelRefresh = () => {
    if (pageNo !== 1) {
      setPageNo(1)
    } else {
      runGetQuestionStatListService()
    }
    runGetQuestionStatAverageTimeService()
  }

  // 构造表格列
  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c
    const colTitle = props!.title || title
    return {
      title: (
        <Tooltip placement="topLeft" title={colTitle}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            <p
              style={{
                color: fe_id === selectedComponentId ? '#1890ff' : 'inherit',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                margin: 0,
              }}
            >
              {colTitle}
            </p>
          </div>
        </Tooltip>
      ),
      dataIndex: fe_id,
    }
  })

  // 表格数据处理
  const dataSource = list.map(
    (i: { id: number; answerContent: Array<{ value: string; componentId: string }> }) => {
      const { answerContent } = i
      const obj: Record<string, unknown> = {}
      answerContent.forEach((element: { value: string; componentId: string }) => {
        obj[element.componentId] = element.value
      })
      return { ...i, key: i.id, ...obj }
    }
  )

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const TableElem = (
    <>
      <div className="py-4">
        <Space direction="horizontal">
          <Text type="secondary">回收量：</Text>
          <Text strong>{total}</Text>

          <Divider type="vertical" />

          <Text type="secondary">平均完成时间：</Text>
          {!loadingAverageTime && <Text strong>{averageTime}</Text>}
        </Space>
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          fixed: true,
        }}
        columns={columns}
        dataSource={dataSource as any}
        pagination={false}
        scroll={{ x: 120 * columns.length }}
      />

      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={pageNo}
          onChange={pageNo => setPageNo(pageNo)}
          onShowSizeChange={(pageNo, pageSize) => {
            setPageNo(pageNo)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <Card
      title="数据详情"
      extra={
        <Flex gap="small" wrap="wrap">
          <Button icon={<SyncOutlined />} onClick={handelRefresh} />
          <Button icon={<DeleteOutlined />} disabled={!hasSelected} />
          <Button>导入</Button>
          <Button
            type="primary"
            onClick={() => {
              handelExportAnswer()
            }}
          >
            导出
          </Button>
        </Flex>
      }
      bordered={false}
    >
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </Card>
  )
}

export default PageStat
