import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Checkout from '../pages/Checkout'

const BuyRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </>
  )
}

export default BuyRouter