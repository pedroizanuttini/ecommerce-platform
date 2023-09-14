import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AuthRouter = () => {
  return (
    <>
        <Routes>
            {/* htttp://localhost:3000/auth/login */}
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />

            {/* Con esta ruta * estoy redireccionando a loginpage por cualquier otra ruta que no exista */}
            <Route path="*" element={<Login />} />
        </Routes>
    </>
  )
}

export default AuthRouter