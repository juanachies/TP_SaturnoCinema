import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
import "./newMovie.css";

const NewMovie = ({onMovieAdded, show, onClose}) => {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [plot, setPlot] = useState("");
    const [hours, setHours] = useState("");
    const [runtime, setRuntime] = useState("");
    const [rating, setRating] = useState("");
    
  const handleAddMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      director,
      year,
      genre,
      imageUrl,
      plot,
      hours: hours.split(",").map(h => h.trim()),
      runtime,
      rating: parseInt(rating, 10),
    };



    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al agregar película");
      }

      const newMovie = await res.json(); //para que no recargue
      onMovieAdded(newMovie);

      setTitle("");
      setDirector("");
      setYear("");
      setGenre("");
      setImageUrl("");
      setPlot("");
      setHours("");
      setRuntime("");
      setRating("");
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="author">
                  <Form.Label>Director</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                  />
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
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="genre">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar género"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
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
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                  />
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
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
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
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="new-movie-inputs" controlId="genre">
                  <Form.Label>Horarios</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agrega un horario"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="justify-content-between">
              <Form.Group className="new-movie-inputs" controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
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
