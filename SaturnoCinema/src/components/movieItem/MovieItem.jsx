import './movieItem.css';
import { useNavigate } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  const token = localStorage.getItem("token");
  const userType = JSON.parse(localStorage.getItem("user"))?.type

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
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
        {token && userType != 0 &&
          <button className='movie-button'>
            ELIMINAR
          </button>
        }
        
      </div>
    </div>
  );
};

export default MovieItem;
