import './movieListing.css'
import MovieItem from '../../components/movieItem/MovieItem'
import { useState } from 'react'
import MovieSearch from '../../components/movieSearch/MovieSearch'
import NewMovie from '../../components/newMovie/NewMovie'

const MovieListing = ({movies}) => {
    const userType = JSON.parse(localStorage.getItem("user"))?.type

    const [movieSearched, setMovieSearched] = useState('')
    const [movie, setMovie] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(movieSearched.toLocaleLowerCase())
    )

    const handleMovieAdded = (newMovie) => {
        setMovie(newMovie)
        setShowAdd(false)
    };


    return (
        <>
            <div className='movie-listing'>
                <h1 className='movie-listing-title'>CARTELERA</h1>

                <MovieSearch onSearch={setMovieSearched} />
                
                <div className='movies'>
                    {filteredMovies.length > 0 ?
                        filteredMovies.map((movie) => (
                            <MovieItem
                                key={movie.id}
                                movie={movie}
                            />
                        ))
                    : 'No se encontró la película buscada'
                    }
                </div>

                {userType != 0 &&
                    <button className='add-button' onClick={() => setShowAdd(true)}>
                        AGREGAR PELÍCULA
                    </button>
                }
            </div>    

                <NewMovie
                    show={showAdd}
                    onClose={() => setShowAdd(true)}
                    onMovieAdded={handleMovieAdded}
                />
        </>
    );
};

export default MovieListing
