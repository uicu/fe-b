import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PageIllustration from '../../components/PageIllustration'
import FooterLayouts from '../../components/UI/FooterLayouts'
import Hero from './components/hero'
import Features from './components/features'
import Newsletter from './components/newsletter'
import Zigzag from './components/zigzag'
import Testimonials from './components/testimonials'

// import axios from 'axios'
// import '../_mock/index.ts'

// const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => console.log('fetch data', data))
  //   // mock.js 只能劫持 XMLHttpRequest ，不能劫持 fetch

  //   // axios 内部使用 XMLHttpRequest API ，没用 fetch
  //   axios.get('/api/test').then(res => console.log('axios data', res.data))
  // }, [])

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => console.log('fetch data', data))
  //   // axios.get('/api/test').then(res => console.log('axios data', res.data))
  // })

  // function clickHandler() {
  //   // nav('/login')
  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   })
  // }

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (
    // <div className={styles.container}>
    //   <div className={styles.info}>
    //     <Title>问卷调查 | 在线投票</Title>
    //     <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
    //     <div>
    //       <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
    //         开始使用
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <>
      <main className="grow">
        <PageIllustration />

        <Hero />
        <Features />
        <Zigzag />
        <Testimonials />
        <Newsletter />
      </main>

      <FooterLayouts />
    </>
  )
}

export default Home
