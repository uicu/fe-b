import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ChannelStateType } from '../store/channelReducer'

function useGetChannelInfo() {
  const channelList = useSelector<StateType>(state => state.channel) as ChannelStateType
  return channelList
}

export default useGetChannelInfo
