import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash-es'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/WorkComponents'
import { changeComponentProps, pushPast } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(pushPast())
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropComponent } = componentConf
  return (
    <PropComponent
      {...props}
      onChange={debounce(changeProps, 300)}
      disabled={isLocked || isHidden}
    />
  )
}

export default ComponentProp
