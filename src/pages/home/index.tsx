import React, { FC } from 'react'

import Hero from './components/hero-home'
import Features from './components/features-home'
import FeaturesBlocks from './components/features-blocks'
import FeaturesWorld from './components/features-world'
import News from './components/news'
import Cta from './components/cta'
const Home: FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <FeaturesWorld />
      <News />
      <Cta />
    </>
  )
}

export default Home
