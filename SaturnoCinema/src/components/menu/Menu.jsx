import { Link } from 'react-router-dom';
import './menu.css';
import Logout from '../logout/Logout';

const Menu = () => {
    const token = localStorage.getItem("token");
    const userType = JSON.parse(localStorage.getItem("user"))?.type

    return (
        <div className='menu-style'>
            <ul className='lista-menu'>
                {token && userType === 2 &&
                    <li><Link to="/users">USUARIOS</Link></li>
                }

                {token &&
                    <li><Link to="/reservations">RESERVAS</Link></li>
                }
                
                <li><Link to="/movies">CARTELERA</Link></li>
                <li><Link to="/login">INGRESAR</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>

                <Logout/>
            </ul>
        </div>
    )
}

export default Menu