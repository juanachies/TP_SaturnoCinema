import { useLocation, useNavigate } from "react-router";
import { Badge, Button, Card, Row } from "react-bootstrap";
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

  const { Poster, Title, Director, Year, Runtime, Plot, rating = 0 } = movie;

  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <>
      <div className="movie-details-page">
        <Card className="movie-details-card my-3 w-50 mx-auto shadow">
          <Card.Img height={500} variant="top" src={Poster} />
          <Card.Body>
            <Card.Title>{Title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {Director} ({Year})
            </Card.Subtitle>
            <div className="mb-2">{starRating}</div>
            <Badge bg="info" className="mb-3">
              {Runtime} minutos
            </Badge>
            <p>
              <b>Sinopsis:</b> {Plot}
            </p>
            <Row className="gap-2">
              <Button onClick={() => setShowEdit(true)}>Editar Película</Button>
              <Button onClick={clickHandle}>Volver</Button>
            </Row>
          </Card.Body>
        </Card>
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