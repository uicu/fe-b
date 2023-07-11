import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { EditorStateType } from '../store/editorReducer'

function useGetEditorInfo() {
  const { editorSelectedId } = useSelector<StateType>(state => state.editor) as EditorStateType
  return { editorSelectedId }
}

export default useGetEditorInfo
