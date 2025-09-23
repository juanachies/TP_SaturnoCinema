import './movieItem.css'

const MovieItem = ({title, runTime, genre, posterUrl}) => {

    const handleClick = () => {
        //a movie details
    }

    return (
        <div className='movie-card'>
            <div className='poster-container'>
                <img src={posterUrl} alt={`poster de ${title}`} />
            </div>
            <div className='container'>
                <h3 className='movie-card-title'>{title}</h3>
                <p>{genre}</p>
                <p>Duración: {runTime}</p>
                <button onClick={handleClick} className='movie-button'>VER MAS</button>
            </div>
        </div>
    )
}

export default MovieItem