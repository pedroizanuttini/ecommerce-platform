import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// AuthProvider es un componente que recibe como parámetro un objeto children que es el componente que se va a renderizar dentro de AuthProvider, este componente es toda la aplicación
// AuthProvider entonces envuelve a toda la aplicación y le pasa el valor de auth y setAuth a todos los componentes que se encuentran dentro de AuthProvider
const AuthProvider = ({ children }) => { 
    
    // auth es un objeto que contiene el token, el usuario y un booleano que indica si el usuario está autenticado o no
    // trabajar con un objeto es más fácil que trabajar con tres variables separadas
    const [auth, setAuth] = useState({
        token: null,
        user: null,
        isAuth: false,
    });

    useEffect(() => {
        const isAuthLocalStorage = JSON.parse(localStorage.getItem("isAuth"));
        if (isAuthLocalStorage) {
            const user = JSON.parse(localStorage.getItem("user"));
            setAuth({ token:null, user, isAuth: true });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
        setAuth({ token: null, user: null, isAuth: false });
    }
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;