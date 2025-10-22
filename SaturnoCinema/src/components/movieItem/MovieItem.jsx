import "./movieItem.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../confirmModal/ConfirmModal";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const MovieItem = ({ movie, onMovieDeleted }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user?.type;
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClick = () => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  const handleDelete = async () => {
    if (!token || userType === 0) {
      alert("No tienes permisos para eliminar películas.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/movies/${movie.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al eliminar película");
      }

      onMovieDeleted?.();
      setShowConfirmModal(false);
    } catch (error) {
      console.error(error.message);
      alert("No se pudo eliminar la película: " + error.message);
    }
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.imageUrl} alt={`poster de ${movie.title}`} />
      </div>

      <div className="container">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p>{movie.genre}</p>
        <p>Duración: {movie.runtime}</p>

        <button onClick={handleClick} className="movie-button">
          VER MÁS
        </button>

        {token && userType !== 0 && (
          <button
            className="movie-button delete"
            onClick={() => setShowConfirmModal(true)}
          >
            ELIMINAR
          </button>
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default MovieItem;
