import { useLocation, useNavigate } from "react-router";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import NewMovie from '../../components/NewMovie/NewMovie';  


const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

 
  const [showNewMovie, setShowNewMovie] = useState(false);

  
  const [movie, setMovie] = useState(null);

  
  useEffect(() => {
    if (location.state && location.state.movie) {
      setMovie(location.state.movie);
    }
  }, [location.state]);

  
  const handleShowNewMovie = () => {
    setShowNewMovie(!showNewMovie);
  };

  
  const clickHandle = () => {
    navigate("/cinema");
  };

  
  const handleMovieUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setShowMovieForm(false);
  };

  

  const { Poster, Title, Director, Year, Runtime, Plot, rating } = movie;

 
  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <>
      <Card className="my-3 w-50 mx-auto shadow">
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
          <Row>
            <Button className="mb-2 me-2" onClick={handleShowNewMovie}>
              {showNewMovie? "Ocultar formulario" : "Editar película"}
            </Button>
            <Button className="me-2" onClick={clickHandle}>
              Volver 
            </Button>
          </Row>
        </Card.Body>
      </Card>

      
      {showNewMovie && (
        <NewMovie
          isEditing={true}
          movie={movie}
          onMovieSaved={handleMovieUpdated}
        />
      )}
    </>
  );
};

export default MovieDetails;
