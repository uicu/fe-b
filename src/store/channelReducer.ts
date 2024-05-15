import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 作品类型
export type ChannelStateType = Array<{
  name: string
  id: number
  desc: string
}>

const INIT_STATE: ChannelStateType = []

export const channelSlice = createSlice({
  name: 'channel',
  initialState: INIT_STATE,
  reducers: {
    channelReducer: (state: ChannelStateType, action: PayloadAction<ChannelStateType>) => {
      return action.payload
    },
  },
})

export const { channelReducer } = channelSlice.actions

export default channelSlice.reducer
