import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Space, Input, message, Popconfirm, Tooltip } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateWorkService, publishWorkService } from '../../../services/work'

// 显示和修改标题
const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, SetEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  let ele = (
    <Space>
      <Tooltip title={title}>
        <h4 className="text-lg m-0 w-40 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h4>
      </Tooltip>
      <Button
        className="hidden md:block"
        icon={<EditOutlined />}
        type="text"
        onClick={() => SetEditState(true)}
      />
    </Space>
  )
  if (editState) {
    ele = (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      />
    )
  }

  return (
    <>
      <p className="text-sm max-w-40 whitespace-nowrap text-ellipsis overflow-hidden block md:hidden">
        {title}
      </p>
      <div className="hidden md:block">{ele}</div>
    </>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = [], props = {}, setting = {} } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateWorkService(id, {
        ...pageInfo,
        content: { components: componentList, props, setting },
      })
    },
    { manual: true }
  )

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自定保存（不是定期保存，不是定时器）
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
    >
      暂存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const pageInfo = useGetPageInfo()

  const { status } = pageInfo

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await publishWorkService(id)
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav(`/work/stat/${id}/overview`) // 发布成功，跳转到统计页面
      },
    }
  )

  return (
    <Popconfirm
      placement="bottomRight"
      title="确定发布该作品？"
      description={
        status === 2
          ? '此操作会将目前的修改推送给正在答题的用户'
          : '此操作会生成答题链接，可以用于投放'
      }
      okText="确定"
      cancelText="取消"
      onConfirm={pub}
    >
      <Button type="primary" disabled={loading}>
        {status === 2 ? '更新发布' : '发布'}
      </Button>
    </Popconfirm>
  )
}

// 编辑器头部
const EditHeader: FC = () => {
  return (
    <header className="absolute w-full z-30">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Space className="w-72">
            <Link to={'/manage/list'}>
              <LeftOutlined />
              <span className="hidden md:inline">工作台</span>
            </Link>
            <TitleElem />
          </Space>

          <div className="hidden lg:block">
            <EditToolbar />
          </div>

          <Space className="w-72 justify-end">
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </header>
  )
}

export default EditHeader
