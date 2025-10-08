import { useLocation, useNavigate } from "react-router";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import EditMovie from "../../components/editMovie/editMovie";
import "./MovieDetails.css";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (location.state && location.state.movie) {
      setMovie(location.state.movie);
    }
  }, [location.state]);

  if (!movie) return <p>Cargando película...</p>;

  const clickHandle = () => navigate("/movies");

  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setShowEdit(false);
  };

  const { Poster, Title, Director, Year, Runtime, Plot, rating = 0, Genre } = movie;

  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <>
      
      <div className="movie-details-page">
        <h1>{Title}</h1>
        <div className="movie-details-body">
          <img src={Poster} alt="Poster de la pelicula" />
          <div className="movie-info">
            <div className="info-item">
              <p className="mini-title">Director</p>
              <p>{Director}</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Año</p>
              <p>{Year}</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Duración</p>
              <p>{Runtime} minutos</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Rating</p>
              <div>{starRating}</div>
            </div>
            <div className="info-item">
              <p className="mini-title">Géneros</p>
              <p>{Genre}</p>
            </div>
            <div className="sinopsis">
              <h2>Sinopsis</h2>
              <p>{Plot}</p>
            </div>
            <button className="details-button" onClick={() => setShowEdit(true)}>Editar Película</button>
            <button className="details-button" onClick={clickHandle}>Volver</button>
          </div>
        </div>
      </div>

      <EditMovie 
        show={showEdit} 
        onClose={() => setShowEdit(false)} 
        onMovieAdded={handleMovieUpdated}
      />
    </>
  );
};

export default MovieDetails;