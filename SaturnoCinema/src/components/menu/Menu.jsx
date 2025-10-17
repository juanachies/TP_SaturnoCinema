import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    const userType = JSON.parse(localStorage.getItem("user"))?.type

    return (
        <div className='menu-style'>
            <ul className='lista-menu'>
                {userType === 2 &&
                    <li><Link to="/users">USUARIOS</Link></li>
                }
                
                <li><Link to="/movies">CARTELERA</Link></li>
                <li><Link to="/login">INGRESAR</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
            </ul>
        </div>
    )
}

export default Menu