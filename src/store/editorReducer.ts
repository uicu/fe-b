import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type EditorStateType = {
  editorSelectedId: string
}

const INIT_STATE: EditorStateType = { editorSelectedId: '' }

export const editorSlice = createSlice({
  name: 'editor',
  initialState: INIT_STATE,
  reducers: {
    // 修改 selectedId
    changeEditorSelectedId: produce((draft: EditorStateType, action: PayloadAction<string>) => {
      draft.editorSelectedId = action.payload
    }),
  },
})

export const { changeEditorSelectedId } = editorSlice.actions

export default editorSlice.reducer
