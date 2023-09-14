import { FaBeerMugEmpty } from 'react-icons/fa6'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import './CartWidget.css'

const CartWidget = () => {

  const { cart } = useContext(CartContext) // useContext es un hook que permite consumir el contexto desde un componente
  // en este caso, el contexto es CartContext y lo que se va a consumir es el estado cart que se encuentra en el contexto y contiene los items del carrito

  // si uso cart.length, me va a mostrar la cantidad de items que hay en el carrito pero no la cantidad de unidades de cada item
  // para eso, tengo que recorrer el array de items y sumar la cantidad de cada uno
 // Esto lo podemos resolver usando el método iterador de los arrays .reduce()
 // Sintaxis: array.reduce((acumulador, item) => acumulador + item.cantidad, 0)
  // El 0 es el valor inicial del acumulador, en este caso, la cantidad de items en el carrito
  // El acumulador es el valor que se va a ir sumando en cada iteración, en este caso, la cantidad de cada item
  // El item es cada uno de los items del array
  // El resultado de la función reduce() es la suma de todos los items del array

  const totalItems = cart.reduce((acum, item) => acum + item.qty, 0);     

  return (
    <div className='cartwidget'>
        <FaBeerMugEmpty color='white' size={40}/>
        
        <div className='cardwidget__qty'>
            <span>{ totalItems }</span>
        </div>
    </div>
  )
}

export default CartWidget