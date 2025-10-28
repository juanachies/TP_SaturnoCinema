import './logout.css'
import { useState } from 'react'; 
import Notification from '../notifications/Notifications'; 

const Logout = () => {
    const token = localStorage.getItem("token");
    
    const [notification, setNotification] = useState({ message: "", type: "" });

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        setNotification({ message: 'Sesión cerrada con éxito', type: 'success' }); 

        setTimeout(() => {
            window.location.href = "/";
        }, 1000); 
    }

    return (
        <>
            {token && 
                <button onClick={handleLogout} className='logout'>CERRAR SESIÓN</button>
            }

          
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
            />
        </>
    )
}

export default Logout