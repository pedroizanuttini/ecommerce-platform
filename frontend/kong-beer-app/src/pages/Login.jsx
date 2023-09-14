import React from 'react'
import BannerPosition from '../components/BannerPosition/BannerPosition'
import LoginForm from '../components/LoginForm/LoginForm'

const Login = () => {
  return (
    <div>
        <BannerPosition 
            title={'Account'}
            subtitle={'Home/Account'}
            image={'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
        />


        <LoginForm />

    </div>
  )
}

export default Login