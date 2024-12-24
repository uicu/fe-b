/**
 * @description 将Quill Delta转换为HTML
 */

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function quillGetHTML(value: { ops: any[] }) {
  if (typeof value === 'string') return value
  const deltaOps = value.ops
  const cfg = {}
  const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg)
  const html = converter.convert()
  return html
}
