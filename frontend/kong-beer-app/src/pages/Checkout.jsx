import React from 'react'
import BannerPosition from '../components/BannerPosition/BannerPosition'
import CheckoutForm from '../components/CheckoutForm/CheckoutForm'

const Checkout = () => {
  return (
    <div className='min-screen'>
        <BannerPosition 
            title={'Checkout'}
            subtitle={'Estás a un paso de completar tu compra'}
            image={'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
        />


        <CheckoutForm />

    </div>
  )
}

export default Checkout