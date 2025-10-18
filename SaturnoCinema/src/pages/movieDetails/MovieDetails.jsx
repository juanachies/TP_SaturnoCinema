import { useLocation, useNavigate } from "react-router";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import EditMovie from "../../components/editMovie/editMovie";
import "./MovieDetails.css";
import ReserveTickets from "../../components/reserveTickets/reserveTickets";

const MovieDetails = () => {
  const userType = JSON.parse(localStorage.getItem("user"))?.type

  const location = useLocation();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [movie, setMovie] = useState(null);
  const [showReserve, setShowReserve] = useState(false);
  useEffect(() => {
    const movieId = location.state.id;
    if (!movieId) return;

    fetch(`http://localhost:5000/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch(() => alert("ERROR cargando la pelicula "));
  }, [location.state]);

  if (!movie) return <p>Cargando pelicula</p>;

  const clickHandle = () => navigate("/movies");

  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setShowEdit(false);
  };

  const { imageUrl, title, director, year, runtime, plot, rating = 0, genre,hours } = movie;

  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <>
      
      <div className="movie-details-page">
        <h1>{title}</h1>
        <div className="movie-details-body">
          <img src={imageUrl} alt="Poster de la pelicula" />
          <div className="movie-info">
            <div className="info-item">
              <p className="mini-title">Director</p>
              <p>{director}</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Año</p>
              <p>{year}</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Duración</p>
              <p>{runtime} minutos</p>
            </div>
            <div className="info-item">
              <p className="mini-title">Rating</p>
              <div>{starRating}</div>
            </div>
            <div className="info-item">
              <p className="mini-title">Generos</p>
              <p>{genre}</p>
            </div>
            <div className="sinopsis">
              <h2>Sinopsis</h2>
              <p>{plot}</p>
            </div>   <div className="hours">
              <h2>Horarios disponibles</h2>
              <p>{hours}</p>
            </div>
            <button className="details-button" onClick={() => setShowEdit(true)}>Editar Película</button>
            <button className="details-button" onClick={clickHandle}>Volver</button>
            <button className="details-button" onClick={() => setShowReserve(true)}>Reservar Ticket</button>
          </div>
        </div>
      </div>

      <EditMovie 
        show={showEdit} 
        onClose={() => setShowEdit(false)} 
        onMovieAdded={handleMovieUpdated}
      />
     <ReserveTickets
    showModal={showReserve}
    onCloseModal={() => setShowReserve(false)}
    movieDetails={movie}
    />
    </>
  );
};

export default MovieDetails;