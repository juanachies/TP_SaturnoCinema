import React from 'react'
import { useLocation, useNavigate } from "react-router";
import { Star, StarFill } from "react-bootstrap-icons";

const MovieDetails = () => {

  const clickHandle = () => {
    navigate=("/cinema")
  }
  const starRating= Array.from({length:5},
    
    (_,index) => 
      index<rating ? (
        <StarFill key={index} />
      ):
      (<Star key={index}/>

      )
    );

    return (

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
          <p>Sinopsis:</p> {Plot}
        </p>
        <Button className="me-2" onclick={clickHandle}>
          Volver al cine
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieDetails
