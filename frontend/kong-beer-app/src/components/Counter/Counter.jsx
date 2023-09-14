import { useState } from 'react'; // importamos el hook useState
import Button from '../Button/Button';
import './Counter.css'

const Counter = ({ stock, addProduct }) => {

    // vamos a declarar un estado para el contador a partir del hook useState
    const [count, setCount] = useState(1);
    //count = count + 1; // esto no se puede hacer, no se puede modificar el estado directamente
    // setCount(count + 1); // esto si se puede hacer, pero no es lo recomendable
    // setCount((prevCount) => prevCount + 1); // esto es lo recomendable, ya que prevCount es el valor anterior del estado

    // vamos a declarar una función para incrementar o decrementar el contador

    const addCount = (value) => {
        setCount(count + value)
    }

    return (

        <div className="count-container">
            <div className="count-container__counter">
                <button
                    className="count-container__button"
                    disabled={count === 1}
                    onClick={() => { addCount(-1) }}
                >
                    -
                </button>
                <span className="count-container__qty"> {count} </span>
                <button
                    className="count-container__button"
                    disabled={count === stock}
                    onClick={() => { addCount(1) }}
                >
                    +
                </button>
            </div>

            <Button title="Añadir" color="primary" handleClick={ ()=>{addProduct(count)} } />

        </div>
    )
}

export default Counter



