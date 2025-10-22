import { useEffect } from "react";
import "./Notifications.css"; 
const Notification = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default Notification;
