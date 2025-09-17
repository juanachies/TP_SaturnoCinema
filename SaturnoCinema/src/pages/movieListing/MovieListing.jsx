import './movieListing.css'
import MovieItem from '../../components/movieItem/MovieItem'

const MovieListing = ({movies}) => {
    return (
        <div className='movie-listing'>
            <h1 className='movie-listing-title'>CARTELERA</h1>

            <div className='movies'>
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
        </div>
    )
}

export default MovieListing
