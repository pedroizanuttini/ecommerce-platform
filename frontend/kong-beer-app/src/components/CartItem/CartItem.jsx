import React from 'react'
import { MdClose } from 'react-icons/md'
import Button from '../Button/Button'
import './CartItem.css'


const CartItem = ({ product, deleteProductById }) => {

  const { id, name, price, image, qty, description } = product

  
  return (

    <article className="cart-container__item">
      <div className="item__image">
        <img classNameName="product-card__item" src={image} alt="" />
      </div>
      <div className="item__info">
        <h3 className="info__title">{name}</h3>
        <p className="info__price">Precio: {price}</p>
        <p className="qty__value">Cantidad: {qty}</p>
        <p className="qty__value">Subtotal: {qty *price}</p>
      </div>
      <div className='delete-button'>
        <Button 
          color="primary" 
          shape="square" 
          icon={<MdClose size={24} />}  
          handleClick={ () => { deleteProductById(id) } }  
        />
      </div>
    </article>

  )
}

export default CartItem