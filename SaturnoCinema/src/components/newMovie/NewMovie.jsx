import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { validateNewMovie } from "../../auth/Validations";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
import "./newMovie.css";

const NewMovie = ({onMovieAdded, show, onClose}) => {
    const [movieData, setMovieData] = useState({
  title: "",
  director: "",
  year: "",
  genre: "",
  runtime: "",
  rating: "",
  plot: "",
  imageUrl: "",
  hours: ""
});
  const [errors, setErrors] = useState({});

const handleChange = (event) => {
  const { name, value } = event.target;
  setMovieData({
    ...movieData,
    [name]: value
  });
};

  const handleAddMovie = async (e) => {
    e.preventDefault();

     const validationErrors = validateNewMovie({
    ...movieData,
    rating: parseInt(movieData.rating, 10),
    hours: movieData.hours.split(",").map(h => h.trim())
  });

    setErrors(validationErrors);

     if (Object.keys(validationErrors).length > 0) {
    return;
  }

const movieDataToSend = {
    ...movieData,
    rating: parseInt(movieData.rating, 10),
    hours: movieData.hours.split(",").map(h => h.trim())
  };
  
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieDataToSend),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al agregar película");
      }

      const newMovie = await res.json(); //para que no recargue
      onMovieAdded(newMovie);

      setMovieData({
      title:"",
      director:"",
      year:"",
      genre:"",
      imageUrl:"",
      plot:"",
      hours:"",
      runtime:"",
      rating:""
     });
     onClose();

    } catch (error) {
      console.error(error.message);
      alert("No se pudo agregar la pelicula: " + error.message);
    }
  }

  if (!show) return null;


    return (
      <div className={`new-movie-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <Card className="new-movie-card w-50" onClick={(e) => e.stopPropagation()}>
        <Card.Body>
          <Form className="text-white" onSubmit={handleAddMovie}>
            <Row>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="title">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar título"
                    value={movieData.title}
                    name="title"
                    onChange={handleChange}
                  />
                  {errors.title && <p className="errors">{errors.title}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="author">
                  <Form.Label>Director</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar director"
                    value={movieData.director}
                    name="director"
                    onChange={handleChange}
                  />
                  {errors.director && <p className="errors">{errors.director}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="year">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    min={1800}
                    placeholder="Ingresar año"
                    value={movieData.year}
                    name="year"
                    onChange={handleChange}
                  />
                  {errors.year && <p className="errors">{errors.year}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="genre">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar género"
                    value={movieData.genre}
                    name="genre"
                    onChange={handleChange}
                  />
                  {errors.genre && <p className="errors">{errors.genre}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="duracion">
                  <Form.Label>Duración</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la duracion en minutos"
                    value={movieData.runtime}
                    name="runtime"
                    onChange={handleChange}
                  />
                  {errors.runtime && <p className="errors">{errors.runtime}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ingrese la puntuacion (1 a 5)"
                    max={5}
                    min={0}
                    value={movieData.rating}
                    name="rating"
                    onChange={handleChange}
                  />
                  {errors.rating && <p className="errors">{errors.rating}</p>}
                </Form.Group>
              </Col>
            </Row>
             <Row>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="sinopsis">
                  <Form.Label>Sinopsis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agrega una sinopsis"
                    value={handleChange.plot}
                    name="plot"
                    onChange={handleChange}
                  />
                  {errors.plot && <p className="errors">{errors.plot}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="genre">
                  <Form.Label>Horarios</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agrega un horario"
                    value={movieData.hours}
                    name="hours"
                    onChange={handleChange}
                  />
                  {errors.hours && <p className="errors">{errors.hours}</p>}
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="justify-content-between">
              <Form.Group className="new-movie-inputs" controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  value={movieData.imageUrl}
                  name="imageUrl"
                  onChange={handleChange}
                />
                {errors.imageUrl && <p className="errors">{errors.imageUrl}</p>}
              </Form.Group>
            </Row>
            <Row className="justify-content-end">
              <Col md={4}
              >
                <Button className="new-movie-button" variant="primary" type="submit">
                  Agregar pelicula
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewMovie;
