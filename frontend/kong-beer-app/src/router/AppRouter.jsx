import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRouter from './AuthRouter';
import BuyRouter from './BuyRouter';
import PrivateRouter from './PrivateRouter';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Detail from '../pages/Detail';
import Cart from '../pages/Cart';
import Checkout from "../pages/Checkout";

const AppRouter = () => {
  return (
    <BrowserRouter>
        
        <Navbar />

        <Routes>

          <Route exact path="auth/*" element={<AuthRouter />} />

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />


          <Route path="buy/*" element={
            <PrivateRouter>
                <BuyRouter />
            </PrivateRouter>
          } />
        
        </Routes>

        <Footer />

      </BrowserRouter>
  )
}

export default AppRouter