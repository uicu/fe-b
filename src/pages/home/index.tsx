import React, { FC, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PageIllustration from '../../components/PageIllustration'
import FooterLayouts from '../../components/UI/FooterLayouts'
import Hero from './components/hero'
import Features from './components/features'
import Newsletter from './components/newsletter'
import Zigzag from './components/zigzag'
import Testimonials from './components/testimonials'
const Home: FC = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (
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
