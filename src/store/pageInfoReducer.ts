import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
  currentPage: number // 当前所在page，-1代表结束页
  pageTotal: number // 总page
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false,
  currentPage: 1,
  pageTotal: 1,
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },

    // 修改标题
    changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),

    // 修改当前页
    changeCurrentPage: produce((draft: PageInfoType, action: PayloadAction<number>) => {
      draft.currentPage = action.payload
    }),

    // 修改页总数
    changePageTotal: produce((draft: PageInfoType, action: PayloadAction<number>) => {
      draft.pageTotal = action.payload
    }),
  },
})

export const { resetPageInfo, changePageTitle, changeCurrentPage, changePageTotal } =
  pageInfoSlice.actions

export default pageInfoSlice.reducer
