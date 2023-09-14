import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import AppRouter from './router/AppRouter';
import './App.css'


function App() { // componente

  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  )
}

export default App // exportamos el componente para que sea usado en otros archivos
