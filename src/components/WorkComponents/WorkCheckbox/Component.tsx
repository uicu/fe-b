import React, { FC } from 'react'

import { useDispatch } from 'react-redux'
import { Row, Col, Button, Divider } from 'antd'
import { PlusOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { debounce } from 'lodash-es'
import { nanoid } from 'nanoid'
import { WorkCheckboxDefaultProps, WorkCheckboxPropsType } from './interface'
import WorkReactQuill from '../../WorkReactQuill'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const Component: FC<WorkCheckboxPropsType & { fe_id?: string }> = props => {
  const dispatch = useDispatch()
  const { title = '', list = [], fe_id = '', row } = { ...WorkCheckboxDefaultProps, ...props }

  function handleTitleChange(editorProp: string, delta: string) {
    const newProps = { title: delta }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  function handleTextChange(editorProp: string, delta: string) {
    let newValues = list.map(item => {
      if (item.value === editorProp) {
        return {
          ...item,
          text: delta,
        }
      }
      return {
        ...item,
      }
    })

    newValues = newValues.filter(opt => !(opt.text == null))

    newValues.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) // 补齐 opt value
    })

    const newProps = { list: newValues }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  function add(value: { text: string; value: string }) {
    const newValues = list.concat({ ...value, checked: false })
    const newProps = { list: newValues }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  function remove(value: string) {
    const newValues = list.filter(item => {
      return item.value !== value
    })
    const newProps = { list: newValues }
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return (
    <div>
      <WorkReactQuill
        value={title}
        editorProp="title"
        fe_id={fe_id}
        onChange={debounce(handleTitleChange, 300)}
        showBlanks={false}
        strong
      />
      <Row>
        {list.map(opt => {
          const { value, text } = opt
          return (
            <Col span={row} key={value}>
              <div className="flex items-center px-1">
                <div className="w-4 h-4 rounded border border-solid border-gray-200"></div>
                <WorkReactQuill
                  value={text}
                  editorProp={value}
                  fe_id={fe_id}
                  onChange={debounce(handleTextChange, 300)}
                  showAlign={false}
                />
                {list.length > 2 && (
                  <CloseOutlined className="text-gray-400" onClick={() => remove(value)} />
                )}
              </div>
            </Col>
          )
        })}
      </Row>
      <div className="px-1">
        <Divider dashed className="!my-2" />
        <Button
          className="!p-0"
          type="link"
          onClick={() => add({ text: '选项', value: nanoid(5) })}
          icon={<PlusOutlined />}
        >
          添加选项
        </Button>
        <Divider type="vertical" />
        <Button
          className="!p-0"
          type="link"
          onClick={() =>
            add({
              text: {
                ops: [{ insert: '其他' }, { insert: { blanks: true } }, { insert: '\n' }],
              } as unknown as string,
              value: nanoid(5),
            })
          }
          icon={<PlusCircleOutlined />}
        >
          添加其他
        </Button>
      </div>
    </div>
  )
}

export default Component
