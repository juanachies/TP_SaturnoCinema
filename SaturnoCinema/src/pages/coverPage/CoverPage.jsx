import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/Gallery";
import "./coverPage.css";


const CoverPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="bg-image">
      <h1 className="titulo">Saturno</h1>
      <h2 className="subTitulo">Cinema</h2>
      <p>Experimenta el cine como en los años 80. Donde cada película es una aventura y cada proyección una experiencia única.</p>
      <Button  className='btn-cover'
        onClick={() => navigate("/movies")}
        variant='danger rounded-pill'>
        VER CARTELERA
      </Button>
      {/* <Button
        variant='outline-primary rounded-pill'>
        CONOCE MAS
      </Button> */}
    </div>
    <Gallery/>
    </>
  )
}

export default CoverPage;