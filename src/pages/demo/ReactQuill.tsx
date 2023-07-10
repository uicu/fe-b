import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'quill/dist/quill.bubble.css'

const text: any = [
  {
    insert: '当目标元素有进',
  },
  {
    attributes: {
      color: '#ff9900',
    },
    insert: '一步的描述和',
  },
  {
    insert: '相关操3时\n',
  },
]

function MyComponent() {
  const [value, setValue] = useState(text)

  function onChange(content: any, delta: any, source: any, editor: any) {
    const e = editor.getContents()
    setValue(e)
  }

  useEffect(() => {
    console.log(value)
    console.log(JSON.stringify(value))
  }, [value])

  return <ReactQuill theme="bubble" value={value} onChange={onChange} />
}
export default MyComponent
