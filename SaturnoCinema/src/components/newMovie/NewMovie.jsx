import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
import "./newMovie.css";

const NewMovie = ({ onMovieAdded, show, onClose }) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [plot, setPlot] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();

    const movieData = { title, director, year, genre, imageUrl, plot };

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
    } catch (error) {
      console.error(error.message);
      alert("No se pudo agregar la pelicula: " + error.message);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`new-movie-overlay ${show ? "show" : ""}`}
      onClick={onClose}
    >
      <Card
        className="new-movie-card w-50"
        bg="danger"
        onClick={(e) => e.stopPropagation()}
      >
        <Card.Body>
          <Form className="text-white" onSubmit={handleAddMovie}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="title">
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
                <Form.Group className="mb-3" controlId="director">
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
                <Form.Group className="mb-3" controlId="year">
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
                <Form.Group className="mb-3" controlId="genre">
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
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar url de imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="plot">
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agrega una sinopsis"
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Agregar película
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewMovie;
