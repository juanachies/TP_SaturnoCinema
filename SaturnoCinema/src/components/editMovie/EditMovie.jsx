import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { validateMovie } from "../../auth/Validations";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
import './EditMovie.css';


const EditMovie = ({ movieToEdit, onMovieEdited, show, onClose }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    runtime: "",
    rating: "",
    plot: "",
    imageUrl: "",
    hours: "",
  })

   const [errors, setErrors] = useState({});

   useEffect(() => {
    if (movieToEdit) {
      setMovieData({
        title: movieToEdit.title,
        director: movieToEdit.director,
        year: movieToEdit.year,
        genre: movieToEdit.genre,
        runtime: movieToEdit.runtime,
        rating: movieToEdit.rating,
        plot: movieToEdit.plot,
        imageUrl: movieToEdit.imageUrl,
        hours: movieToEdit.hours.join(", "),
      });
    }
  }, [movieToEdit]);

     const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleEditMovie = async (e) => {
    e.preventDefault();

    const movieDataToSend = {
      ...movieData,
      rating: parseInt(movieData.rating, 10),
      hours: movieData.hours.split(",").map(h => h.trim())
    };

    const validationErrors = validateMovie(movieDataToSend);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    

    try{
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/movies/${movieToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieDataToSend),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al editar película");
      }

      const updatedMovie = await res.json();
      onMovieEdited(updatedMovie);
      onClose();

    } catch (error) {
      console.error(error.message);
      alert("No se pudo editar la película: " + error.message);
    }
  };

  if (!show) return null;

  return (
    <div className={`edit-movie-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <Card className="edit-movie-card w-50" onClick={e => e.stopPropagation()}>
        <Card.Body>
          <Form className="text-white" onSubmit={handleEditMovie}>
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
                <Form.Group className="new-movie-inputs" controlId="director">
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
                    placeholder="Ingresar año"
                    min={1800}
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
                <Form.Group className="edit-movie-inputs" controlId="duracion">
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
                <Form.Group className="edit-movie-inputs" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ingrese la puntuacion (0 a 5)"
                    max={5}
                    min={0}
                    name="rating"
                    value={movieData.rating}
                    onChange={handleChange}
                  />
                  {errors.rating && <p className="errors">{errors.year}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row >
              <Col md={6}>
                <Form.Group className="edit-movie-inputs" controlId="plot">
                  <Form.Label>Sinopsis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agregar sinopsis"                   
                    value={movieData.plot}
                    name="plot"
                    onChange={handleChange}
                  />
                  {errors.plot && <p className="errors">{errors.plot}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="edit-movie-inputs" controlId="hours">
                  <Form.Label>Horarios</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 10:00, 15:00, 20:00"
                    value={movieData.hours}
                    name="hours"
                    onChange={handleChange}
                  />
                  {errors.hours && <p className="errors">{errors.hours}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row className="edit-movie-inputs">
              <Form.Group controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar URL de imagen"
                  value={movieData.imageUrl}
                  name="imageUrl"
                  onChange={handleChange}
                />
                {errors.imageUrl && <p className="errors">{errors.imageUrl}</p>}
              </Form.Group>
            </Row>
            <Row className="justify-content-end">
              <Col md={3} className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="edit-movie-button">
                  Editar película
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditMovie;
