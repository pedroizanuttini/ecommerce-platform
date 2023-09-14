import React from 'react'
import BannerPosition from '../components/BannerPosition/BannerPosition'
import ItemContainer from '../components/ItemContainer/ItemContainer'
const Products = () => {
  return (
    <div style={{color:'white'}}>
      <BannerPosition 
        title="Productos"
        subtitle="Nuestros productos son de la mejor calidad"
        image="https://images.pexels.com/photos/63633/bar-local-cong-ireland-63633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <ItemContainer />    
    </div>
  )
}

export default Products