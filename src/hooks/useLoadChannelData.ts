import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetChannelInfo from './useGetChannelInfo'
import { getChannelList } from '../services/channel'
import { channelReducer } from '../store/channelReducer'

function useLoadChannelData() {
  const dispatch = useDispatch()
  const [waitingChannelData, setWaitingChannelData] = useState(true)

  const { run } = useRequest(getChannelList, {
    manual: true,
    onSuccess(result) {
      const { channel } = result.data
      dispatch(channelReducer(channel))
    },
    onFinally() {
      setWaitingChannelData(false)
    },
  })

  const channelList = useGetChannelInfo()
  useEffect(() => {
    if (channelList.length) {
      setWaitingChannelData(false)
      return
    }
    run()
  }, [channelList])

  return { waitingChannelData, channelList }
}

export default useLoadChannelData
