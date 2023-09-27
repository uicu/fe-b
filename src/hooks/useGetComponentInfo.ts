import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  // redux store
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType

  const {
    componentList = [],
    selectedId,
    copiedComponent,
    currentPage,
    pageTotal,
  } = components.present

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    copiedComponent,
    currentPage,
    pageTotal,
    selectedComponent,
    isPast: components.past.length > 0,
    isFuture: components.future.length > 0,
  }
}

export default useGetComponentInfo
