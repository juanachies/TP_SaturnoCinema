import {Routes, Route} from 'react-router-dom'
import MovieListing from '../pages/movieListing/MovieListing'
import CoverPage from '../pages/coverPage/CoverPage'
import Footer from '../components/footer/Footer'
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Header from '../components/header/Header'
import MovieDetails from '../pages/movieDetails/MovieDetails'
import Contact from '../pages/contacto/contactForm'
import { useState, useEffect } from 'react'
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;


const Dashboard = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/movies`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Error al obtener las peliculas');
                }
                return res.json()
            })
            .then((data) => {
                setMovies(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<CoverPage/>} />
                <Route path='movies' element={<MovieListing movies={movies}/>} />
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
                <Route path='movies/:id' element={<MovieDetails />} />
                <Route path='contacto' element={<Contact />} />
            </Routes>
            <Footer/>
        </>
    )
}

export default Dashboard
