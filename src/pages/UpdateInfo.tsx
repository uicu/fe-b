import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import SendCaptcha from '../components/SendCaptcha'
import HeadPicUpload from '../components/HeadPicUpload'
import { HOME_PATHNAME } from '../router'
import { getUserUpdateCaptchaService, updateService } from '../services/user'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { changeHeadPic, changeNickName } from '../store/userReducer'

const UpdateInfo: FC = () => {
  const dispatch = useDispatch()
  const userInfo = useGetUserInfo() // 从 redux 中获取用户信息
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useNavigate()

  const [initData, setInitData] = useState({
    headPic: '',
    nickName: '',
    email: '',
    captcha: '',
  })

  useEffect(() => {
    setInitData({
      headPic: userInfo.headPic,
      nickName: userInfo.nickName,
      email: userInfo.email,
      captcha: '',
    })
  }, [])

  const { run: runUpdate } = useRequest(
    async values => {
      const { headPic, nickName, email, captcha } = values
      await updateService(headPic, nickName, email, captcha)
    },
    {
      manual: true,
      onSuccess() {
        messageApi.success('修改成功')
        const { headPic, nickName } = initData
        dispatch(changeHeadPic(headPic))
        dispatch(changeNickName(nickName))
        nav(HOME_PATHNAME) // 跳转到首页
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        messageApi.error(error.data || '系统繁忙，请稍后再试')
      },
    }
  )

  const onFinish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runUpdate(initData)
  }

  const { run: runGetUpdateCaptcha } = useRequest(
    async params => {
      console.log(params)
      await getUserUpdateCaptchaService()
    },
    {
      manual: true,
      onSuccess(data, params) {
        const { call } = params[0]
        call?.()
        messageApi.success('验证码发送成功')
      },
    }
  )
  const sendCaptcha = async function (call: () => void) {
    if (!initData.email) {
      return messageApi.error('请输入邮箱地址')
    }
    runGetUpdateCaptcha({ call })
  }

  return (
    <>
      {contextHolder}
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1 mb-4">个人信息修改</h1>
              <p className="text-xl text-gray-400">
                在此过程中我们将向您的邮箱发送一封验证个人信息修改的邮件，请注意查收
              </p>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form onSubmit={onFinish}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <HeadPicUpload
                    value={initData.headPic}
                    onChange={value => {
                      setInitData({
                        ...initData,
                        headPic: value,
                      })
                    }}
                  />
                  <p className="text-center w-full"> 姓名: {userInfo.username}</p>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="nickName"
                    >
                      昵称 <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={initData.nickName}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          nickName: e.target.value,
                        })
                      }
                      id="nickName"
                      type="text"
                      className="form-input w-full text-gray-800"
                      placeholder="请输入昵称"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                      电子邮箱
                    </label>
                    <input
                      value={initData.email}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          email: e.target.value,
                        })
                      }
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-800"
                      placeholder="请输入电子邮箱"
                      required
                      disabled
                    />
                  </div>
                </div>

                <SendCaptcha
                  value={initData.captcha}
                  onChange={captcha => {
                    setInitData({
                      ...initData,
                      captcha,
                    })
                  }}
                  onSendCaptcha={sendCaptcha}
                />

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      修改
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateInfo
