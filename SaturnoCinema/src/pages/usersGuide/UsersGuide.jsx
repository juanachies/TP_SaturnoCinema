import { useState } from "react";
import UserItem from "../../components/userItem/UserItem";
import './usersGuide.css';
import Notification from "../../components/notifications/Notifications";

const UsersGuide = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleUserDeleted = (deletedUserId) => {
    setUsers(prev => prev.filter(u => u.id !== deletedUserId));
    showNotification("Usuario eliminado con éxito", "success");
  };

  return (
    <>
      <div className="users-guide">
        <h1 className="users-title">USUARIOS</h1>
        <div className="users">
          {users.length > 0 ? users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onUserDeleted={() => handleUserDeleted(user.id)}
              showNotification={showNotification} // para que UserItem pueda disparar notificaciones
            />
          )) : <p>No hay usuarios disponibles</p>}
        </div>
      </div>


      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </>
  );
};

export default UsersGuide;
