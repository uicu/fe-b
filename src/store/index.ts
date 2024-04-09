import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import interactionReducer, { InteractionStateType } from './interactionReducer'
import channelReducer, { ChannelStateType } from './channelReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType> // 增加了 undo
  pageInfo: PageInfoType
  interaction: InteractionStateType
  channel: ChannelStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // 自定义undo
    components: componentsReducer,
    // 增加了 undo
    // components: undoable(componentsReducer, {
    //   limit: 20, // 限制 undo 20 步
    //   filter: excludeAction([
    //     'components/resetComponents',
    //     'components/changeSelectedId',
    //     'components/selectPrevComponent',
    //     'components/selectNextComponent',
    //   ]),
    // }),
    pageInfo: pageInfoReducer,
    interaction: interactionReducer,
    channel: channelReducer,
  },
})
