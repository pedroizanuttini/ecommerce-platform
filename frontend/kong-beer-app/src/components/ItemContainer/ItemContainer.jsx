import { useState, useEffect } from "react";

import Item from "../Item/Item";
import "./ItemContainer.css";

const ItemContainer = ({title}) => {
    const url = "http://localhost:3000/api/v1/products"
    const [products, setProducts] = useState([]); // el estado inicial es un array vacío

    const getProducts = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect es un hook que ejecuta un bloque de codigo en determinados ciclos de vida del componente
    // por ejemplo, cuando el array de dependencias del useEffect está vacío, el bloque de código se ejecuta una sola vez cuando el componente se monta
    useEffect(()=>{
        // el bloque de código que se ejecuta cuando el componente se monta
        setTimeout(() => {
            getProducts();
        }, 3000);
    }, []) // array de dependencias

    // si el array de dependencias tiene elementos, el bloque de código se ejecuta cuando el componente se monta y cada vez que alguno de los elementos del array cambie
    // pero si el array está vacío, el bloque de código se ejecuta una sola vez




  return (
    <section className="items">
        <h2 className="items__title">{title}</h2>
        <div className="items-container">
        {
            products.length > 0  // renderizado condicional
                ? products.map( (prod) => <Item item={prod} key={prod.id} /> )
                : (<p style={{color:'white'}}>Cargando.productos..</p>)
        }
        </div>
    </section>
  )
}

export default ItemContainer




    // TODO:
    // 1.- comunicarnos con el servidor (API) para obtener los datos (Fetch) ✅
    // 1.a.- crear un estado para guardar los datos (useState) ✅
    // 1.b.- implementar un useEffect para que se ejecute cuando el componente se monte ✅
    // 2.- recibir los datos del servidor ✅
    // 3.- guardar los datos en un estado (useState) ✅
    // 4.- mostrar los datos en el componente (.map()) ✅


    // ADVERTENCIA DE RE-RENDERIZADO
    // Tenemos que evitar que se vuelva a renderizar el componente una vez que se haya montado 

    //getProducts(); // si llamo a esta función suelta, se ejecuta y modifica el estado, por lo que se vuelve a renderizar el componente
    // sin embargo, una vez que el componente se vuelva a renderizar, esta función se volverá a ejecutar, y así sucesivamente
    // lo que provoca un bucle infinito