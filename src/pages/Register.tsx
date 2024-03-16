import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '../router'
import { registerService } from '../services/user'
import styles from './Register.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_PATHNAME) // 跳转到登录页
      },
    }
  )

  const onFinish = (values: any) => {
    run(values) // 调用 ajax
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
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
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign up with Google</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-700 border-dotted grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-400">Or, register with your email</div>
              <div
                className="border-t border-gray-700 border-dotted grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="full-name"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="full-name"
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
                    htmlFor="company-name"
                  >
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="Your company or app name"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">
                    Work Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-300"
                    placeholder="you@yourcompany.com"
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
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 10 characters)"
                    required
                  />
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                I agree to be contacted by Open PRO about this offer as per the Open PRO{' '}
                <Link
                  to="#"
                  className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out"
                >
                  Privacy Policy
                </Link>
                .
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already using Open PRO?{' '}
              <Link
                to="/login"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div className={styles.container}>
    //   <div>
    //     <Space>
    //       <Title level={2}>
    //         <UserAddOutlined />
    //       </Title>
    //       <Title level={2}>注册新用户</Title>
    //     </Space>
    //   </div>
    //   <div>
    //     <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
    //       <Form.Item
    //         label="用户名"
    //         name="username"
    //         rules={[
    //           { required: true, message: '请输入用户名' },
    //           { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
    //           { pattern: /^\w+$/, message: '只能是字母数字下划线' },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item
    //         label="密码"
    //         name="password"
    //         rules={[{ required: true, message: '请输入密码' }]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //       <Form.Item
    //         label="确认密码"
    //         name="confirm"
    //         dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
    //         rules={[
    //           { required: true, message: '请输入密码' },
    //           ({ getFieldValue }) => ({
    //             validator(_, value) {
    //               if (!value || getFieldValue('password') === value) {
    //                 return Promise.resolve()
    //               } else {
    //                 return Promise.reject(new Error('两次密码不一致'))
    //               }
    //             },
    //           }),
    //         ]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //       <Form.Item label="昵称" name="nickname">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
    //         <Space>
    //           <Button type="primary" htmlType="submit">
    //             注册
    //           </Button>
    //           <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
    //         </Space>
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </div>
  )
}

export default Register
