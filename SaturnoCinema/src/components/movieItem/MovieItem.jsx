const MovieItem = ({title, runTime, genre, posterUrl,}) => {
    return (
        <div>
            <p>{genre}</p>
            <h3>{title}</h3>
            <p>Duración: {runTime}</p>
        </div>
    )
}

export default MovieItem