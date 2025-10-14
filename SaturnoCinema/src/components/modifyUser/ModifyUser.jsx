import './modifyUser.css'
import { useState } from 'react'
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const ModifyUser = ({user, onClose}) => {

    const [type, setType] = useState(user.type);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`${baseUrl}/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type }),
        });

        if (!res.ok) throw new Error('Error al actualizar usuario');
        alert('Usuario actualizado correctamente');
        onClose(); // cerrar el formulario
        } catch (err) {
        console.error(err);
        alert('Hubo un error al actualizar el usuario');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Modificar permisos de {user.name} {user.surname}</h4>
                <form onSubmit={handleSubmit}>
                <label>
                    Tipo de usuario: {' '}
                    <select value={type} onChange={(e) => setType(Number(e.target.value))}>
                        <option value={0}>Normal</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Superadmin</option>
                    </select>
                </label>

                <div className="actions">
                    <button type="submit">Guardar cambios</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyUser