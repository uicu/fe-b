import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

// 专门处理各种UI交互类跨组件通信
export type InteractionStateType = {
  editorSelectedId: string
}

const INIT_STATE: InteractionStateType = { editorSelectedId: '' }

export const interactionSlice = createSlice({
  name: 'interaction',
  initialState: INIT_STATE,
  reducers: {
    // 修改 selectedId
    changeEditorSelectedId: produce(
      (draft: InteractionStateType, action: PayloadAction<string>) => {
        draft.editorSelectedId = action.payload
      }
    ),
  },
})

export const { changeEditorSelectedId } = interactionSlice.actions

export default interactionSlice.reducer
