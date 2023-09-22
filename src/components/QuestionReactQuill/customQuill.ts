import { KeyboardEvent } from 'react'
import { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'

// 【1】覆盖图标
const icons = Quill.import('ui/icons')
icons['color'] =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M13.197 7.347l5.245 12.98a1 1 0 01-1.854.75L14.94 17H9.059l-1.647 4.077a1 1 0 11-1.854-.75l5.245-12.98A1 1 0 0112 6.76l-.105.036a1 1 0 011.301.552zM12 9.721L9.867 15h4.265L12 9.72z"></path><rect width="2" height="4" rx="1" transform="translate(11 2)"></rect><rect width="2" height="4" rx="1" transform="scale(-1 1) rotate(45 -7.328 -4.45)"></rect><rect width="2" height="4" rx="1" transform="scale(-1 1) rotate(-45 -3.672 26.935)"></rect><g transform="rotate(90 5.5 16.5)"><rect width="2" height="4" rx="1"></rect><rect y="16" width="2" height="4" rx="1"></rect></g></g></svg>'

icons['image'] =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 4a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3zm0 2H5a1 1 0 00-1 1v10a1 1 0 001 1h1l9-9 5 5V7a1 1 0 00-1-1zm-4 5.828L8.828 18H19a1 1 0 001-1v-.172l-5-5zM7.5 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill-rule="evenodd"></path></svg>'

icons['link'] =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.754 10.295a4.452 4.452 0 01.159 6.133l-.158.166-3.151 3.151a4.454 4.454 0 01-6.457-6.133l.158-.166 1.55-1.55a1 1 0 011.498 1.32l-.084.095-1.55 1.55a2.454 2.454 0 003.342 3.59l.128-.12 3.152-3.151c.959-.958.959-2.512 0-3.47a1 1 0 111.413-1.415zm5.906-5.99a4.454 4.454 0 01.157 6.133l-.158.167-1.55 1.549a1 1 0 01-1.497-1.321l.083-.094 1.55-1.549a2.454 2.454 0 00-3.342-3.59l-.128.12-3.151 3.15a2.454 2.454 0 00-.12 3.343l.12.128a1 1 0 11-1.415 1.414 4.454 4.454 0 01-.157-6.133l.157-.166 3.151-3.15a4.452 4.452 0 016.3 0z"></path></svg>'

icons['video'] =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 3a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2H4zm.666 2A.667.667 0 004 5.667v12.666c0 .369.298.667.666.667h14.667a.667.667 0 00.667-.667V5.667A.667.667 0 0019.333 5H4.666z"></path><path opacity="0.01" d="M0 0h24v24H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.2 7.7c.138 0 .27.028.39.079l.12.058 5.686 3.283a.953.953 0 01-.001 1.73v.002l-5.688 3.284-.01.002a1 1 0 01-1.49-.751l-.004-.067H8.2V8.7l.006-.117A1 1 0 019.2 7.7zm1 2.73v3.111l2.696-1.556L10.2 10.43z"></path></svg>'

icons['blanks'] =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 3a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2H4zm.666 2A.667.667 0 004 5.667v12.666c0 .369.298.667.666.667h14.667a.667.667 0 00.667-.667V5.667A.667.667 0 0019.333 5H4.666z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 15a1 1 0 100 2h2a1 1 0 100-2H7zM7 7a1 1 0 100 2h2a1 1 0 100-2H7z"></path><path d="M7 9h2v6H7z"></path><path opacity="0.01" d="M23.666.333h-23v23h23z"></path></svg>'

// 【2】图片缩放插件
/*
   插件内部选中图片按删除键的时候导致以下报错（报错的原因是里面写了window.Quill.find）：
    Uncaught TypeError: Cannot read property 'find' of undefined
      at HTMLDocument.checkImage (image-resize.min.js:formatted:1)
   因此重写 ImageResize 模块里的checkImage 方法
*/
class PlainResize extends ImageResize {
  checkImage = (event: KeyboardEvent) => {
    if (this.img) {
      if (event.keyCode === 46 || event.keyCode === 8) {
        Quill.find(this.img).deleteAt(0)
      }
      this.hide()
    }
  }
}
Quill.register('modules/imageResize', PlainResize)

// 【3】自定义空格工具
class Blanks {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null | undefined
  constructor(container: string) {
    this.canvas = typeof container === 'string' ? document.querySelector(container) : container
    this.canvas?.setAttribute('width', '80')
    this.canvas?.setAttribute('height', '10')
    this.canvas?.setAttribute('style', 'border-bottom: 1px solid #000000; vertical-align: middle;')
    // const ctx = this.canvas?.getContext('2d')
    // if (!ctx) return
    // ctx.beginPath() //开始绘制
    // ctx.moveTo(0, 30)
    // ctx.lineTo(180, 30)
    // ctx.strokeStyle = '#000000' //将线条颜色设置为蓝色
    // ctx.stroke() //stroke() 方法默认颜色是黑色（如果没有上面一行，则会是黑色）。
  }
}

const Embed = Quill.import('blots/embed')

class BlanksBlot extends Embed {
  static blotName = 'blanks'
  static tagName = 'canvas'

  static create(value: { id: string; width: number; height: number }) {
    const node = super.create(value)
    const { id, width, height } = value
    node.setAttribute('id', id || BlanksBlot.blotName)

    if (width !== undefined) {
      node.setAttribute('width', width)
    }
    if (height !== undefined) {
      node.setAttribute('height', height)
    }
    // 绘制空格的逻辑
    new Blanks(node)
    return node
  }
}
Quill.register('formats/blanks', BlanksBlot)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function blanksHandler(this: any) {
  const { index } = this.quill.getSelection() as { index: number }

  // 1.在之前插入空格
  this.quill.insertText(index, ' ')

  // 2.插入自定义内容
  this.quill.insertEmbed(index + 1, 'blanks', {
    id: 'canvas-blanks',
  })

  // 3.在之后插入空格
  this.quill.insertText(index + 2, ' ')

  // 4.将光标定位到后面
  this.quill.setSelection(index + 3)
}

//【4】自定义剪贴板
// quill.clipboard.addMatcher (Node.ELEMENT_NODE, function (node, delta) {
//   var plaintext = node.innerText
//   var Delta = Quill.import('delta')
//   return new Delta().insert(plaintext)
// })

export function customMatcher(node: HTMLElement) {
  const Delta = Quill.import('delta')
  const delta = new Delta()
  try {
    const plaintext = node.innerText
    return delta.insert(plaintext)
  } catch (error) {
    console.warn('粘贴失败', error)
    return delta.insert('粘贴失败')
  }
}

//【5】上传本地图片到服务器

//这是点击图片图标触发的事件
export function imageHandler(this: any) {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.setAttribute('multiple', 'multiple')
  input.click()
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const that = this
  input.onchange = async () => {
    Array.from(input.files as unknown as []).forEach(item => {
      const formData = new FormData()
      formData.append('file', item)
      setTimeout(() => {
        const { index: cursorPosition } = that.quill.getSelection() as { index: number } //获取当前光标位置
        const link =
          'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg'
        that.quill.insertEmbed(cursorPosition, 'image', link) //插入图片
        that.quill.setSelection(cursorPosition + 1) //光标位置加1
      }, 800)
      //业务需求安装了压缩图片的插件，可忽略
      // new Compressor(item, {
      //   quality: 0.8,
      //   convertSize: 1024 * 1024 * 8,
      //   success(result) {
      //   //很很很很重要的一步
      //     const formData = new FormData();
      //     formData.append('file', result, result.name);
      //     Axios({
      //       method: 'post',
      //       data: formData,
      //       url: config.RES_URL + 'connector?isRelativePath=true'，//图片上传的接口
      //     }).then(res => {

      //     })
      //   },
      // });
    })
  }
}

export default Quill
