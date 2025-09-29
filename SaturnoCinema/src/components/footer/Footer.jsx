import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <footer>
            <div className='info'>
                <div className='cinema'>
                    <h3 className="footer-title">SATURNO CINEMA</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aspernatur cupiditate iste minus. Nobis iure accusamus odit vel vero odio. Autem modi tempora ipsum, quasi sed corrupti dolores aperiam recusandae.</p>
                    <nav>
                        <a href="https://www.instagram.com/">Instagram</a>
                        <a href="https://www.facebook.com/">Facebook</a>
                        <a href="https://x.com/">Twitter</a>
                    </nav>
                </div>
                <div className='navegacion'>
                    <h4 className='footer-subtitle'>NAVEGACIÓN</h4>
                    <Link to='/'>Inicio</Link>
                    <Link to='/movies'>Cartelera</Link>
                    <Link to='/login'>Registrarse</Link>
                </div>
                <div className='contacto'>
                    <h4 className='footer-subtitle'>CONTACTO</h4>
                    <p>📍Av. Neón 1985, Local 80-85</p>
                    <p>📞 (555) 80-CINEMA</p>
                    <p>✉️ info@saturnocinema.com</p>
                    <p>🕐 Lun-Dom: 14:00-02:00</p>
                </div>
            </div>
            <div className='bottom'>
                <p>© Saturno Cinema. Todos los derechos reservados.</p>
            </div>
            
        </footer>
    )
}

export default Footer