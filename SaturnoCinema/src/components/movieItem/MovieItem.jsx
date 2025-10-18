import './movieItem.css';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;


const MovieItem = ({ movie, onMovieDeleted }) => {
  const userType = JSON.parse(localStorage.getItem("user"))?.type
  
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  const handleDelete = async (e) => {
        e.preventDefault();
        try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${baseUrl}/movies/${movie.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }).then(
        async res => {
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al eliminar película");
          }
          alert("Pelicula eliminada.");
          onMovieDeleted();
        }
      )
    } catch (error) {
      console.error(error.message);
      alert("No se pudo eliminar la pelicula ", error.message);
    };
  };


  return (
    <div className='movie-card'>
      <div className='poster-container'>
        <img src={movie.imageUrl} alt={`poster de ${movie.title}`} />
      </div>
      <div className='container'>
        <h3 className='movie-card-title'>{movie.title}</h3>
        <p>{movie.genre}</p>
        <p>Duración: {movie.runtime}</p>
        <button onClick={handleClick} className='movie-button'>
          VER MÁS
        </button>
        {userType != 0 &&
          <button className='movie-button' onClick={handleDelete}>
            ELIMINAR
          </button>
        }
        
      </div>
    </div>
  );
};

export default MovieItem;
