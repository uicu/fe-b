import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { InteractionStateType } from '../store/interactionReducer'

function useGetInteractionInfo() {
  const { editorSelectedId } = useSelector<StateType>(
    state => state.interaction
  ) as InteractionStateType
  return { editorSelectedId }
}

export default useGetInteractionInfo
