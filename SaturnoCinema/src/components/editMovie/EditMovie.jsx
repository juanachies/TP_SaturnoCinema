import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import './EditMovie.css';

const EditMovie = ({ onMovieAdded, show, onClose }) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [plot, setPlot] = useState("");

  const handleAddMovie = (e) => {
    e.preventDefault();
    const movieData = { title, director, year, genre, imageUrl, plot };
    onMovieAdded(movieData);
    setTitle(""); setDirector(""); setYear(""); setGenre(""); setImageUrl(""); setPlot("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className={`edit-movie-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <Card className="edit-movie-card w-50" onClick={e => e.stopPropagation()}>
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
                    onChange={e => setTitle(e.target.value)}
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
                    onChange={e => setDirector(e.target.value)}
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
                    placeholder="Ingresar año"
                    min={1800}
                    value={year}
                    onChange={e => setYear(e.target.value)}
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
                    onChange={e => setGenre(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar URL de imagen"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="plot">
                  <Form.Label>Sinopsis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agregar sinopsis"
                    value={plot}
                    onChange={e => setPlot(e.target.value)}
                  />
                </Form.Group>
              </Col>
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
