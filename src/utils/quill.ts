/**
 * @description 将Quill Delta转换为HTML
 */

import Quill, { Delta } from 'quill'

export function quillGetHTML(value: Delta | string) {
  if (typeof value === 'string') return value

  const tempCont = document.createElement('div')
  new Quill(tempCont).setContents(value)
  return tempCont.getElementsByClassName('ql-editor')[0].innerHTML
}
