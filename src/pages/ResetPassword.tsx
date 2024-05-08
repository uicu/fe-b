import React, { FC, useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import SendCaptcha from '../components/SendCaptcha'
import { LOGIN_PATHNAME } from '../router'
import { updatePasswordService, getUserUpdatePasswordCaptchaService } from '../services/user'

const ResetPassword: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useNavigate()
  const [initData, setInitData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    captcha: '',
  })

  const { run: runUpdatePassword } = useRequest(
    async values => {
      const { username, password, email, captcha } = values
      await updatePasswordService(username, password, email, captcha)
    },
    {
      manual: true,
      onSuccess() {
        messageApi.success('注册成功')
        nav(LOGIN_PATHNAME) // 跳转到登录页
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        messageApi.error(error.data || '系统繁忙，请稍后再试')
      },
    }
  )

  const onFinish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (initData.password !== initData.confirmPassword) {
      return messageApi.error('两次密码不一致')
    }
    runUpdatePassword(initData)
  }

  const { run: runGetUpdatePasswordCaptcha } = useRequest(
    async params => {
      const { email } = params
      await getUserUpdatePasswordCaptchaService(email)
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
    runGetUpdatePasswordCaptcha({ email: initData.email, call })
  }

  return (
    <>
      {contextHolder}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1 mb-4">忘记密码了吗</h1>
              <p className="text-xl text-gray-400">
                在此过程中我们将向您的邮箱发送一封验证重置密码的邮件，请注意查收。
              </p>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form onSubmit={onFinish}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="username"
                    >
                      姓名 <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={initData.username}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          username: e.target.value,
                        })
                      }
                      id="username"
                      type="text"
                      className="form-input w-full text-gray-800"
                      placeholder="请输入姓名"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                      电子邮件
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
                      placeholder="请输入电子邮件"
                      required
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
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      新密码 <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={initData.password}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          password: e.target.value,
                        })
                      }
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-800"
                      placeholder="请输入新密码"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="confirm-password"
                    >
                      再次输入新密码 <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={initData.confirmPassword}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          confirmPassword: e.target.value,
                        })
                      }
                      id="confirm-password"
                      type="password"
                      className="form-input w-full text-gray-800"
                      placeholder="请再次输入新密码"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      重设密码
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                <Link
                  to={LOGIN_PATHNAME}
                  className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                >
                  取消
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetPassword
