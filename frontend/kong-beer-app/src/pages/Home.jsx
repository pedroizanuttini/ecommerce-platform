import React from 'react'
import Hero from '../components/Hero/Hero'
import ItemContainer from '../components/ItemContainer/ItemContainer'

const Home = () => {
  return (
    <main>
      <Hero title="El Rey de la Cerveza"/>
      <ItemContainer title="Conoce nuestros productos" />
    </main>
  )
}

export default Home