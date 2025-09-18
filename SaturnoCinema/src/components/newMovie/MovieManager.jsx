import { useState } from "react";
import NewMovie from "./NewMovie";
import MovieItem from "../movieItem/MovieItem";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

const MovieManager = ({ movies }) => {
  const [movieListing, setMovieListing] = useState(movies);

  const handleMovieAdded = (movie) => {
    const movieData = { ...movie, id: Math.random() };
    console.log(movieData);
    setMovieListing((prevMovieListing) => [movieData, ...prevMovieListing]);
  };

  return (
    <>
      <NewMovie onMovieAdded={handleMovieAdded} />
      {movieListing.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </>
  );

  
};


export default MovieManager;
