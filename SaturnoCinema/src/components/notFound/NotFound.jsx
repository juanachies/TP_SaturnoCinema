import { useNavigate } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="not-found container bg-image-notFound">

            <h2 className='titulo-notFound'><span className='span'>Ups!</span><br /> Usted no tiene autorización para esto.</h2>
            <p className='parrafo-notFound'>Presione el botón para volver a la página principal.</p>
            <button className='button-notFound' onClick={handleRedirect}>Volver al inicio</button>
        </div>
    );
};

export default NotFound;
