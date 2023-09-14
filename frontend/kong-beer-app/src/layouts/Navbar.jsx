import { Link, useNavigate } from 'react-router-dom'; // ayuda a cambiar de ruta sin recargar la página
import { MdMenu, MdPerson } from "react-icons/md";

import CartWidget from '../components/CartWidget/CartWidget';
import './styles/Navbar.css'; // Importing CSS Stylesheet
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = ({ background }) => {

    //Declaro una variable donde voy a almacenar la ruta de la imagen que quiero mostrar
    const brand = 'https://f.hubspotusercontent10.net/hub/20044066/hubfs/raw_assets/public/kong/images/logo.png?width=190&name=logo.png';
    //la lógica va siempre antes del return

    // sintaxis para extraccion de datos de un contexto
    const { auth, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Button Clicked');
    }

    return (
        <header className={`header background--${background}`}>

            <div className="header-container">

                {/* Botón de menú  */}
                <div className="menu-button">
                    <MdMenu color='#FFFFFF' size="30px" />
                    <span>Menu</span>
                </div>

                {/* links de navegación */}
                <nav>
                    <ul className="nav-container">
                        <li>
                            <Link to="/">
                                Inicio
                            </Link>
                        </li>
                        <li className="products-item">
                            <Link to="/products">
                                Productos <span className="arrow"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* logo de la marca */}
                <div className="logo-container">
                    <Link to="/">
                        <img src={brand} alt="logo" />
                    </Link>
                </div>

                {/* cart widget */}
                <div className='cartwidget-container'>

                    {/* Añadir logica de renderizado condicional para mostrar un mensaje 'Hola, {nombreDeUSUARIO} | Cerrar Sesión'  */}

                    {auth.isAuth ?
                        <div>
                            <span className='cartwidget-container_auth'>Hola {auth.user.fname} </span> | <span className='cartwidget-container_auth' onClick={() => { logout(); navigate('/') }} >Cerrar sesion</span>
                        </div>
                        :
                        <Link to="/auth/login">
                            <div>
                                <MdPerson color="white" size="36" />
                            </div>
                        </Link>
                    }

                    <Link to="/cart">
                        <CartWidget />
                    </Link>
                </div>

            </div>
        </header>
    )

}


export default Navbar;