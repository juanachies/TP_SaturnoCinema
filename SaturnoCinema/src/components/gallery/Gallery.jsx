import './gallery.css'
import img1 from '../../img/gallery1.png'
import img2 from '../../img/gallery2.png'
import img3 from '../../img/gallery3.png'

const Gallery = () => {
    return (
        <div className="gallery">
            <h1>NUESTRO CINE</h1>
            <div className='gallery-imgs'>
                <img src={img1} alt="Imagen" />
                <img src={img2} alt="Imagen" />
                <img src={img3} alt="Imagen" />
            </div>
        </div>
    )
}

export default Gallery