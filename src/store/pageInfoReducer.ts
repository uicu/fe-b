import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  status: number
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  status: 1,
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
  },
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
