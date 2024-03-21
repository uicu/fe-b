import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, message, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }

  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      const { id } = result.data
      nav(`/question/edit/${id}`)
      message.success('创建成功')
    },
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white h-20">{/* 导航样式 */}</div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 pb-3">
          <Space>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider type="vertical" />
            <Button
              type={pathname.startsWith('/manage/list') ? 'default' : 'dashed'}
              size="large"
              onClick={() => nav('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/star') ? 'default' : 'dashed'}
              size="large"
              onClick={() => nav('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/trash') ? 'default' : 'dashed'}
              size="large"
              onClick={() => nav('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className="pt-3 pb-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ManageLayout
