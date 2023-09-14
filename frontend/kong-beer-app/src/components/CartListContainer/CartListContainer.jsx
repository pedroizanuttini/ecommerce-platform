import React from 'react'
import './CartListContainer.css'
import CartItem from '../CartItem/CartItem'


const CartListContainer = ({cart, deleteProductById}) => {

  return (
    <section className="cart">
        <div className="cart-title">
            <h2>Productos</h2>
        </div>
        <div className='cart-container'>
            {
              cart.map((prod) => <CartItem deleteProductById={deleteProductById} product={prod} key={prod.id}/> )   // si hay productos en el carrito
            }
        </div>
    </section>
  )
}

export default CartListContainer