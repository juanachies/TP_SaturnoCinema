import './movieItem.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const MovieItem = ({movie}) => {

    const navigate = useNavigate()

    const {id} = useParams()

    const handleClick = (movie) => {
        navigate(`/${id}`, {
            state: movie
        })
    }

    return (
        <div className='movie-card'>
            <div className='poster-container'>
                <img src={movie.Poster} alt={`poster de ${movie.Title}`} />
            </div>
            <div className='container'>
                <h3 className='movie-card-title'>{movie.Title}</h3>
                <p>{movie.Genre}</p>
                <p>Duración: {movie.Runtime}</p>
                <button onClick={handleClick} className='movie-button'>VER MAS</button>
            </div>
        </div>
    )
}

export default MovieItem