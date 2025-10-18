import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const NewMovie = ({onMovieAdded, show, onClose}) => {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [plot, setPlot] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDirector = (e) => {
    setDirector(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  }
  const handleChangeGenre = (e) => {
    setGenre(e.target.value);
  };
  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleChangePlot = (e) => {
    setPlot(e.target.value);
  };
  const handleAddMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      director,
      year,
      genre,
      imageUrl,
      plot,
    };

    try {
      const res = await fetch(`${baseUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.menssage || "Error al agregar película");
      }
      const newMovie = await res.json();
      console.log("Pelicula agregada:", newMovie);

      onMovieAdded(movieData);
      setTitle("");
      setDirector("");
      setYear("");
      setGenre("");
      setImageUrl("");
      setPlot("");
    } catch (error) {
      console.error(error.message);
      alert("No se pudo agregar la pelicula: ", error.menssage);
    };

    
    if (!show) return null;

    return (
      <div className={`new-movie-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <Card className="new-movie-card w-50" bg="danger">
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
                    onChange={handleChangeTitle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="author">
                  <Form.Label>Director</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar autor"
                    value={director}
                    onChange={handleChangeDirector}
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
                    placeholder="Ingresar el año que fue creada"
                    min={1800}
                    value={year}
                    onChange={handleChangeYear}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="genre">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Selecciona el genero"
                    value={genre}
                    onChange={handleChangeGenre}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-between">
              <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  value={imageUrl}
                  onChange={handleChangeImageUrl}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sinopsis">
                  <Form.Label>Sinopsis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Agrega una sinopsis"
                    value={plot}
                    onChange={handleChangePlot}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col
                md={3}
                className="d-flex flex-column justify-content-end align-items-end"
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
}

  export default NewMovie;