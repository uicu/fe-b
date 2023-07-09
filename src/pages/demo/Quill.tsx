import React, { FC, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
let quill: Quill

const testtext: any = [
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

const Demo: FC = () => {
  function add() {
    const range = quill.getSelection()
    if (range) {
      quill.insertEmbed(range.index, 'dragon', {
        id: 'canvas-dragon',
      })
    }
  }
  function del() {
    quill.deleteText(0, 6)
  }
  function get() {
    const c = quill.getContents()
    console.log(JSON.stringify(c))

    // const c = quill.getFormat()
    // console.log(c)
  }

  function format() {
    quill.format('color', 'red')
    quill.format('align', 'right')
  }

  useEffect(() => {
    if (quill) return
    const dragonIcon = '龙'
    const icons = Quill.import('ui/icons')
    icons.dragon = dragonIcon
    quill = new Quill('#editor', {
      theme: 'bubble',
      modules: {
        toolbar: {
          container: [[{ color: [] }, 'link', 'image', 'dragon', 'video']],
          handlers: {
            dragon(value: any) {
              const { index } = quill.getSelection() as any
              if (!index) return
              // 插入自定义内容
              quill.insertEmbed(index, 'dragon', {
                id: 'canvas-dragon',
              })
            },
          },
        },
      },
    })

    quill.setContents(testtext, 'user')
  })
  return (
    <>
      <div id="editor"></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={del}>del</button>
      <button onClick={add}>add</button>
      <button onClick={get}>get</button>
      <button onClick={format}>format</button>
    </>
  )
}

export default Demo

const BlockEmbed = Quill.import('blots/block/embed')

class DragonBlot extends BlockEmbed {
  static blotName = 'dragon'
  static tagName = 'canvas'

  static create(value: { id: any; width: any; height: any }): any {
    console.log(value, '123')

    const node = super.create(value)
    console.log(node, 'node')

    const { id, width, height } = value

    node.setAttribute('id', id || DragonBlot.blotName)
    if (width !== undefined) {
      node.setAttribute('width', width)
    }
    if (height !== undefined) {
      node.setAttribute('height', height)
    }

    // 绘制龙的逻辑，参考大帅老师的文章：https://juejin.cn/post/6963476650356916254
    new Dragon(node)

    return node
  }
}

Quill.register('formats/dragon', DragonBlot)

class Dragon {
  canvas: any
  ctx: any
  constructor(container: string) {
    console.log(container, 'container')

    this.canvas = typeof container === 'string' ? document.querySelector(container) : container
    this.canvas?.setAttribute('width', '120')
    this.canvas?.setAttribute('height', '120')
    this.canvas?.setAttribute('style', 'border: solid 2px #ddd')
    const ctx = this.canvas?.getContext('2d')

    ctx.beginPath() //开始绘制
    ctx.arc(95, 50, 40, 0, 2 * Math.PI) //arc 的意思是“弧”
    ctx.strokeStyle = 'blue' //将线条颜色设置为蓝色
    ctx.stroke() //stroke() 方法默认颜色是黑色（如果没有上面一行，则会是黑色）。
  }
}
