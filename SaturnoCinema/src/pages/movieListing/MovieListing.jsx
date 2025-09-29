import './movieListing.css'
import MovieItem from '../../components/movieItem/MovieItem'
import { useState } from 'react'
import MovieSearch from '../../components/movieSearch/MovieSearch'

const MovieListing = ({movies}) => {

    const [movieSearched, setMovieSearched] = useState('')
    const filteredMovies = movies.filter(movie => 
        movie.Title.toLowerCase().includes(movieSearched.toLocaleLowerCase())
    )


    return (
        <div className='movie-listing'>
            <h1 className='movie-listing-title'>CARTELERA</h1>

            <MovieSearch onSearch={setMovieSearched} />
            
            <div className='movies'>
                {filteredMovies.length > 0 ?
                    filteredMovies.map((movie, index) => (
                        <MovieItem
                            key={index}
                            movie={movie}
                            // title={movie.Title}
                            // runTime={movie.Runtime}
                            // genre={movie.Genre}
                            // posterUrl={movie.Poster}
                        />
                    ))
                : 'No se encontró la película buscada'
                }
            </div>
        </div>
    )
}

export default MovieListing
