import Counter from '../Counter/Counter'
import { useContext } from 'react' // useContext es un hook que permite acceder a un contexto desde un componente
import { CartContext } from '../../context/CartContext' // importo el contexto que quiero acceder
import './Item.css'

const Item = ({ item }) => {

  const { addItem } = useContext(CartContext) // desestructuro addItem del contexto CartContext

  // Al hacer click en el boton de agregar al carrito, se ejecuta la funcion addProduct
  // declarar addProduct dentro de Item me permite acceder a la prop item y pasar la funcion addProduct 
  // como prop a Counter para que Counter pueda acceder a la prop item y a la funcion addProduct
  const addProduct = ( qty ) => { // addProduct es una funcion que recibe un parametro qty
    addItem(item, qty) // addItem es una funcion que recibe dos parametros, item y qty y los pasa al contexto CartContext
    alert(`Agregaste ${qty} productos ${item.name} al carrito`);
  }

  return (
    <article className="product-card">
      <img className="product-card__image" src={item.image} alt="" />
      <h3 className="product-card__name">{item.name}</h3>
      <span className="product-card__name">${item.price}</span>

      <Counter stock={item.stock} addProduct={addProduct} />
    </article>
  )
}

export default Item