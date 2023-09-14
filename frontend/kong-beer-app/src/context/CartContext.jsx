// crear un context para mi carrito de compras
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(); // creo el contexto

const CartProvider = ({ children }) => { // creo el provider para el contexto y le paso los children

    const [cart, setCart] = useState([]); // creo el estado inicial del carrito
    const [total, setTotal] = useState(0); // creo el estado inicial del total del carrito
    useEffect(()=>{ // creo el useEffect para obtener el carrito del local storage SOLO cuando se monta el componente

        const cartStorage = JSON.parse(localStorage.getItem('cart')); // obtengo el carrito del local storage y lo guardo en una variable, pero es un string y lo tengo que parsear. Si no hay nada en el local storage, me devuelve null
        if(cartStorage){ // si hay algo en el local storage
            setCart(cartStorage); // actualizo el estado del carrito con lo que hay en el local storage
        }
    }, []) // el array de dependencias vacio hace que se ejecute una sola vez cuando se monta el componente


    const addItem = (item, qty) => { // creo la funcion para agregar items al carrito
        // setCart([...cart, {...item, qty}]); // agrego el item al carrito

        let product = {...item, qty};

        if (cart.some(el => el.id === product.id)){ // si el producto ya esta en el carrito

            let index = cart.findIndex(el => el.id ===item.id);
            let product = cart[index];
            product.qty = product.qty + qty;
            
            const newCart = [...cart];
            newCart.splice( index, 1, product);

            setCart([...newCart]);
            // vamos a mandar tambien el nuevo carrito al local storage
            localStorage.setItem('cart', JSON.stringify([...newCart])); //🔁 actualizo el local storage con el nuevo carrito
        }else{
            setCart([...cart, product]);
            // vamos a mandar tambien el nuevo carrito al local storage
            localStorage.setItem('cart', JSON.stringify([...cart, product])); //🔁 actualizo el local storage con el nuevo carrito 
        }

    }

    const deleteProductById = (id) => {
        const newCart = [... cart];
        let index = newCart.findIndex(el => el.id===id);
        newCart.splice(index, 1 )

        setCart([...newCart]); // actualizo el estado del carrito con el nuevo carrito sin el item que quiero eliminar
    }

    const deleteCart = () => {
        setCart([]);
    }

     const clearCart = () => {
        setCart([]); // actualizo el estado del carrito con un array vacio
        localStorage.removeItem('cart'); // 🔁 actualizo el local storage con el nuevo carrito
    }

    return(
        <CartContext.Provider value={{
            // aca van los valores que quiero compartir
            cart,
            addItem,
            deleteCart,
            deleteProductById,
            total,
            clearCart,
            setTotal
        }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;