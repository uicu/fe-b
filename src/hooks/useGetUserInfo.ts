import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
  const { username, nickName, email, headPic, phoneNumber } = useSelector<StateType>(
    state => state.user
  ) as UserStateType
  return { username, nickName, email, headPic, phoneNumber }
}

export default useGetUserInfo
