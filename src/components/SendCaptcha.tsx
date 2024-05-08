import React, { FC, useEffect, useState, useRef } from 'react'

export type SendCaptchaPropsType = {
  value: string
  onChange: (value: string) => void
  onSendCaptcha: (call: () => void) => void
  seconds?: number
}

const SendCaptcha: FC<SendCaptchaPropsType> = props => {
  const { value, onChange, onSendCaptcha, seconds = 60 } = props
  const [time, setTime] = useState(0)
  const timer = useRef(0)

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (time === seconds) {
      timer.current = window.setInterval(() => setTime(time => --time), 1000)
    } else if (time <= 0) {
      timer.current && clearInterval(timer.current)
    }
  }, [time])

  const getCode = () => {
    if (time) return
    // 作为组件使用
    onSendCaptcha?.(() => {
      setTime(seconds)
    })
  }

  return (
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="captcha">
          验证码 <span className="text-red-600">*</span>
        </label>
        <div className="flex justify-between">
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            id="captcha"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="请输入验证码"
            required
          />

          <button
            onClick={getCode}
            type="button"
            className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-2 min-w-[116px]"
          >
            {time ? `${time}秒后获取` : '获取验证码'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendCaptcha
