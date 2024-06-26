import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type UserStateType = {
  username: string
  nickname: string
  email: string
  headPic: string
  phoneNumber: string
}

const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
  email: '',
  headPic: '',
  phoneNumber: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload // 设置 username nickname 到 redux store
    },
    // 修改头像
    changeHeadPic: produce((draft: UserStateType, action: PayloadAction<string>) => {
      draft.headPic = action.payload
    }),

    // 修改昵称
    changeNickName: produce((draft: UserStateType, action: PayloadAction<string>) => {
      draft.nickname = action.payload
    }),

    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, changeHeadPic, changeNickName, logoutReducer } = userSlice.actions

export default userSlice.reducer
