import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PresentType } from '../store/componentsReducer'

function useGetComponentInfo() {
  // redux store
  const components = useSelector<StateType>(state => state.components.present) as PresentType

  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo
