import './userItem.css'
import usuarioImg from "../../img/usuario.png";

const UserItem = ({user}) => {
    return (
        <div className="user">
            <h3><img src={usuarioImg} alt="icono persona" />{user.name} {user.surname}</h3>
            <p>Email: {user.email}</p>
            <p>Fecha de nacimiento:{" "}
            {new Date(user.birthdate).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })}
            </p>
            <p>Teléfono: {user.telephone}</p>
            <p>Permisos:{' '}
                {user.type === 0
                ? "Normal"
                : user.type === 1
                ? "Superusuario"
                : "Admin"}
            </p>
            <div>
                <button>MODIFICAR</button>
                <button>ELIMINAR</button>
            </div>
            
        </div>
    )
}

export default UserItem