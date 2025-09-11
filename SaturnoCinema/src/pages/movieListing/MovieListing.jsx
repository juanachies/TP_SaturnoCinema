import './movieListing.css'
import MovieItem from '../../components/movieItem/MovieItem'

const MovieListing = ({movies}) => {
    return (
        <div>
            {movies.map((movie, index) => (
                <MovieItem
                    key={index}
                    title={movie.Title}
                    runTime={movie.Runtime}
                    genre={movie.Genre}
                    posterUrl={movie.Poster}
                />
            ))}
        </div>
    )
}

export default MovieListing
