import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import EditMovie from "../../components/editMovie/EditMovie";
import "./MovieDetails.css";
import ReserveTickets from "../../components/reserveTickets/reserveTickets";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const MovieDetails = () => {
  const token = localStorage.getItem("token");
  const userType = JSON.parse(localStorage.getItem("user"))?.type;

  const location = useLocation();
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [movie, setMovie] = useState(null);
  const [showReserve, setShowReserve] = useState(false);

  useEffect(() => {
    // tomar id desde location.state si existe, sino desde params
    const movieId = location.state?.movie?.id || paramId;
    if (!movieId) return;

    fetch(`${baseUrl}/movies/${movieId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((err) => {
        console.error(err);
        alert("ERROR cargando la pelicula");
      });
  }, [location.state, paramId]);

  if (!movie) return <p>Cargando película...</p>;

  const clickHandle = () => navigate("/movies");

  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setShowEdit(false);
  };

  const { imageUrl, title, director, year, runtime, plot, rating = 0, genre, hours } = movie;

  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < Math.round(rating) ? <StarFill key={index} /> : <Star key={index} />
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
            </div>
            <div className="hours">
              <h2>Horarios disponibles</h2>
              <p>{hours}</p>
            </div>

            <button className="details-button" onClick={clickHandle}>Volver</button>

            {token && 
              <button className="details-button" onClick={() => setShowReserve(true)}>Reservar Tickets</button>
            }
            
            {token && userType != 0 && (
              <button className="details-button" onClick={() => setShowEdit(true)}>Editar Pelicula</button>
            )}
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