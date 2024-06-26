import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import zhCN from 'antd/locale/zh_CN'
import store from './store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/reset.css'
import './css/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(93 93 255)',
          colorLink: 'rgb(93 93 255)',
        },
        components: {
          Segmented: {
            itemSelectedColor: 'rgb(93 93 255)',
          },
        },
      }}
      locale={zhCN}
    >
      <Provider store={store}>
        <Suspense>
          <StyleProvider hashPriority="high">
            <App />
          </StyleProvider>
        </Suspense>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
