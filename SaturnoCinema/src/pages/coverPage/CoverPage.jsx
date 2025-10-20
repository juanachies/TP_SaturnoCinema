import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/Gallery";
import "./coverPage.css";


const CoverPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="bg-image">
      <h1 className="titulo">SATURNO</h1>
      <h2 className="subTitulo">CINEMA</h2>
      <div>

        <p>Experimenta el cine como en los años 80. Donde cada película es una aventura y cada proyección una experiencia única.</p>
        <p>Fundado en 1982, en plena era dorada del cine en pantalla grande, Saturno Cinema nació del sueño de compartir historias que hicieran viajar a otros mundos sin moverse de la butaca. En una época en que el sonido del proyector marcaba el ritmo de la noche, este pequeño cine de barrio abrió sus puertas con una promesa: que cada función sería una experiencia inolvidable.</p>
        <p>Sus primeras proyecciones fueron películas que hoy consideramos leyendas: aventuras espaciales, romances imposibles y clásicos que definieron toda una generación. Las filas se formaban desde temprano, el aroma a palomitas se mezclaba con el de la lluvia en las calles, y las luces de neón del cartel anunciaban que una nueva historia estaba por comenzar.</p>
        <p>A lo largo de los años, Saturno Cinema resistió los cambios del tiempo: las cintas se volvieron digitales, las butacas se renovaron, pero el espíritu permaneció intacto. Cada rincón del lugar conserva la esencia de los años 80: las marquesinas iluminadas, los carteles pintados a mano y ese ambiente nostálgico que solo un verdadero cine puede ofrecer.</p>
        <p>Hoy, Saturno Cinema sigue proyectando películas con la misma pasión de sus inicios. Es un refugio para los amantes del cine clásico, un punto de encuentro para nuevas generaciones y un homenaje vivo a la magia del séptimo arte.</p>
        <p>En Saturno, no solo se ven películas, se viaja en el tiempo, se sueña despierto y se celebra el poder de las historias que nos unen.</p>
      </div>

      <Button className='btn-cover'
        onClick={() => navigate("/movies")}
        variant='danger rounded-pill'>
        VER CARTELERA
      </Button>

    </div>
    <Gallery/>
    </>
  )
}

export default CoverPage;