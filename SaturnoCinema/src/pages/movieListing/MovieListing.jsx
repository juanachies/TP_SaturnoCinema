import './movieListing.css'
import MovieItem from '../../components/movieItem/MovieItem'
import { useState } from 'react'
import MovieSearch from '../../components/movieSearch/MovieSearch'
import EditMovie from '../../components/editMovie/editMovie'

const MovieListing = ({movies}) => {

    const [movieSearched, setMovieSearched] = useState('')
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(movieSearched.toLocaleLowerCase())
    )

    const [showAdd, setShowAdd] = useState(false)


    const handleMovieAdded = () => {

        // manejar agregar pelicula

        setShowAdd(false)
    }


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
                        />
                    ))
                : 'No se encontró la película buscada'
                }
            </div>

            <button className='add-button' onClick={() => setShowAdd(true)}>
                AGREGAR PELÍCULA
            </button>

            <EditMovie
                show={showAdd}
                onClose={() => setShowAdd(false)}
                onMovieAdded={handleMovieAdded}
            />
        </div>
    )
}

export default MovieListing
