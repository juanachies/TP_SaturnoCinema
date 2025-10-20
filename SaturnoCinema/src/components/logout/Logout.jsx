import './logout.css'

const Logout = () => {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem('token')
        alert('Sesion cerrada')
        window.location.reload(true)
    }

    return (
        <>
            {token && 
                <button onClick={handleLogout} className='logout'>CERRAR SESIÓN</button>
            }
        </>
    )
}

export default Logout