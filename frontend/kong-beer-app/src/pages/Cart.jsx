import React from 'react'
import BannerPosition from '../components/BannerPosition/BannerPosition'
import CartListContainer from '../components/CartListContainer/CartListContainer'
import Button from '../components/Button/Button'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles/Cart.css';

const Cart = () => {

  // traer un elemento del contexto
  // 1. importar el contexto (CartContext) import { CartContext } from '../../context/CartContext'
  // 2. usar el hook useContext previamente importado import { useContext } from 'react'
  // 3. usar el hook useContext para traer el contexto const { deleteProductById } = useContext(CartContext)

  // Sintaxis: const { nombre_de_la_función } = useContext(nombre_del_contexto)

  //       destructuración        nombre del contexto 
  const { cart, deleteProductById, setTotal } = useContext(CartContext)
  const { auth } = useContext(AuthContext) // traer el contexto de autenticación

  // hook para redireccionar a otra ruta useNavigate()
  // 1. importar el hook useNavigate import { useNavigate } from 'react-router-dom'
  // 2. usar el hook useNavigate previamente importado const navigate = useNavigate()

  const navigate = useNavigate(); // hook para redireccionar a otra ruta

  const total = cart.reduce((acc, product) => acc + (product.price * product.qty), 0);

  return (
    <main className='min-screen'>

      <BannerPosition
        title="Cart"
        subtitle="This is the Cart page"
        image="https://images.pexels.com/photos/1267359/pexels-photo-1267359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />


      {cart.length > 0
        ? (<div className='cart-content'>
          <CartListContainer cart={cart} deleteProductById={deleteProductById} />

          <div className='cart-content__summary'>
            <h2>Order Summary</h2>
            <p>Total: ${total}</p>

            <div className='cart-content__controls'>
              <Button color="primary" title="Proceed to Checkout"
                handleClick={() => {
                  // antes de redireccionar a la ruta de checkout o login, vamos a enviar el total de la compra al contexto de CartContext
                  setTotal(total);
                  if (auth.isAuth) {
                    navigate('/buy/checkout')
                  } else {
                    navigate('/auth/login')
                  }
                }}
              ></Button>
              <Link to="/products"> Continue shopping </Link>
            </div>
          </div>

        </div>)
        :<div>
          <p className='empty-cart-message'>No hay productos en el carrito</p>
          <Link to="/">
            <Button color="primary" title="Back to Menu"></Button>
          </Link>
        </div> 
          

      }


    </main>
  )
}

export default Cart