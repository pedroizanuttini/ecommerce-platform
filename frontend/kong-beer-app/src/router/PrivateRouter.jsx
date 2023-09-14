import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRouter = ({ children }) => {

    const { auth } = useContext(AuthContext);

    // desestructuración de objetos
    // Syntaxis: const { propiedad1, propiedad2 } = objeto
    // definicion


  return auth.isAuth ? children : (
    
    <main>
        <h1>User is not authenticated</h1>
    </main>
  )
}

export default PrivateRouter