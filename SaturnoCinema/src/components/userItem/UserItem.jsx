import "./userItem.css";
import usuarioImg from "../../img/usuario.png";
import { useState } from "react";
import ModifyUser from "../modifyUser/ModifyUser";
import ConfirmModal from "../confirmModal/ConfirmModal";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const UserItem = ({ user, onUserDeleted }) => {
  const [showModify, setShowModify] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userType = loggedUser?.type;

  const handleDelete = async () => {
    if (!token || userType === 0) {
      alert("No tienes permisos para eliminar usuarios.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar usuario");
      }

      
      setShowConfirmModal(false);
       window.location.reload(true)
      if (onUserDeleted) onUserDeleted();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el usuario: " + error.message);
    }
  };

  return (
    <div className="user">
      <h3>
        <img src={usuarioImg} alt="icono persona" /> {user.name} {user.surname}
      </h3>
      <p>Email: {user.email}</p>
      <p>
        Fecha de nacimiento:{" "}
        {new Date(user.birthdate).toLocaleDateString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <p>Teléfono: {user.telephone}</p>
      <p>
        Permisos:{" "}
        {user.type === 0 ? "Normal" : user.type === 1 ? "Admin" : "Superadmin"}
      </p>

      <div>
        <button onClick={() => setShowModify(true)}>MODIFICAR</button>
        {token && userType !== 0 && (
          <button onClick={() => setShowConfirmModal(true)}>ELIMINAR</button>
        )}
      </div>

      {showModify && (
        <ModifyUser user={user} onClose={() => setShowModify(false)} />
      )}

      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default UserItem;
