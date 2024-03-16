import React, { FC, FormEvent, useState } from 'react'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import SendCaptcha from '../components/SendCaptcha'
import { LOGIN_PATHNAME } from '../router'
import { registerService, getUserRegisterCaptchaService } from '../services/user'

export interface RegisterUser {
  username: string
  nickName: string
  password: string
  confirmPassword: string
  email: string
  captcha: string
  agree: boolean
}

const Register: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useNavigate()
  const [initData, setInitData] = useState({
    username: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    email: '',
    captcha: '',
    agree: false,
  })

  const { run: runRegister } = useRequest(
    async values => {
      const { username, password, email, captcha, nickName } = values
      await registerService(username, password, email, captcha, nickName)
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
    if (!initData.agree) {
      return messageApi.error('请勾选用户协议')
    }
    runRegister(initData)
  }

  const { run: runGetUserRegisterCaptcha } = useRequest(
    async params => {
      const { email } = params
      await getUserRegisterCaptchaService(email)
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
    runGetUserRegisterCaptcha({ email: initData.email, call })
  }

  return (
    <>
      {contextHolder}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">欢迎回来，我们的存在是为了让工作变得更容易。</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button
                      type="button"
                      className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                    >
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <span className="flex-auto pl-16 pr-8 -ml-16">使用手机号注册</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-700 border-dotted grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-gray-400">或者，使用您的电子邮件注册</div>
                <div
                  className="border-t border-gray-700 border-dotted grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
              <form onSubmit={onFinish}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="username"
                    >
                      Name <span className="text-red-600">*</span>
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
                      className="form-input w-full text-gray-300"
                      placeholder="First and last name"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="nick-name"
                    >
                      Nick Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={initData.nickName}
                      onChange={e =>
                        setInitData({
                          ...initData,
                          nickName: e.target.value,
                        })
                      }
                      id="nick-name"
                      type="text"
                      className="form-input w-full text-gray-300"
                      placeholder="Your company or app name"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
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
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 10 characters)"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="confirm-password"
                    >
                      Confirm Password <span className="text-red-600">*</span>
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
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 10 characters)"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">
                      Email <span className="text-red-600">*</span>
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
                      className="form-input w-full text-gray-300"
                      placeholder="you@yourcompany.com"
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
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input
                          checked={initData.agree}
                          onChange={() => {
                            setInitData({
                              ...initData,
                              agree: !initData.agree,
                            })
                          }}
                          name="remember"
                          type="checkbox"
                          className="form-checkbox"
                        />
                        <span className="text-gray-400 ml-2">
                          {' '}
                          我已阅读并同意
                          <Link
                            to="#"
                            className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                          >
                            用户服务协议
                          </Link>
                          和
                          <Link
                            to="#"
                            className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                          >
                            隐私政策
                          </Link>
                          .
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                    >
                      注册
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                已经有账号了？
                <Link
                  to={LOGIN_PATHNAME}
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  登陆
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
