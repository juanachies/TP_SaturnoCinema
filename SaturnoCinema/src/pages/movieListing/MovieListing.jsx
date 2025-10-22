import './movieListing.css';
import MovieItem from '../../components/movieItem/MovieItem';
import { useState, useEffect } from 'react';
import MovieSearch from '../../components/movieSearch/MovieSearch';
import NewMovie from '../../components/newMovie/NewMovie';
import Notification from '../../components/notifications/Notifications'; 

const MovieListing = ({ movies: moviesProp }) => {
    const token = localStorage.getItem("token");
    const userType = JSON.parse(localStorage.getItem("user"))?.type;

    const [movies, setMovies] = useState([]); 
    const [movieSearched, setMovieSearched] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    const [notification, setNotification] = useState({ message: "", type: "" }); 

    useEffect(() => {
        setMovies(moviesProp); 
    }, [moviesProp]);

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(movieSearched.toLowerCase())
    );

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleMovieAdded = (newMovie) => {
        setMovies(prev => [newMovie, ...prev]); 
        setShowAdd(false);
        showNotification("Pelicula agregada con exito"); 
    };

    const handleMovieDeleted = (deletedMovieId) => {
        setMovies(prev => prev.filter(m => m.id !== deletedMovieId)); 
        showNotification("Película eliminada con exito")
    };

    return (
        <>
            <div className='movie-listing'>
                <h1 className='movie-listing-title'>CARTELERA</h1>

                <MovieSearch onSearch={setMovieSearched} />

                <div className='movies'>
                    {filteredMovies.length > 0 ? filteredMovies.map(movie => (
                        <MovieItem
                            key={movie.id}
                            movie={movie}
                            onMovieDeleted={() => handleMovieDeleted(movie.id)} 
                        />
                    )) : 'No se encontró la película buscada'}
                </div>

                {token && userType !== 0 &&
                    <button className='add-button' onClick={() => setShowAdd(true)}>
                        AGREGAR PELÍCULA
                    </button>
                }
            </div>

            <NewMovie
                show={showAdd}
                onClose={() => setShowAdd(false)}
                onMovieAdded={handleMovieAdded} 
            />

            
        <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
            />
        </>
    );
};

export default MovieListing;
