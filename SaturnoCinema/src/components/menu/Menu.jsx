import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    return (
        <div className='menu-style'>
            <ul className='lista-menu'>
                <li><Link to="/movies">CARTELERA</Link></li>
                <li><Link to="/login">INGRESAR</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
            </ul>
        </div>
    )
}

export default Menu