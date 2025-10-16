import {Routes, Route} from 'react-router-dom'
import MovieListing from '../pages/movieListing/MovieListing'
import CoverPage from '../pages/coverPage/CoverPage'
import Footer from '../components/footer/Footer'
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Header from '../components/header/Header'
import MovieDetails from '../pages/movieDetails/MovieDetails'
import Contact from '../pages/contacto/contactForm'
import UsersGuide from '../pages/usersGuide/UsersGuide'
import { useState, useEffect } from 'react'
import "./dashboard.css";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;


const Dashboard = () => {

    const [movies, setMovies] = useState([])
    const [users, setUsers] = useState([])

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

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // el token va acá
            }
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            return res.json();
            })
            .then((data) => {
            setUsers(data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="dashboard-layout">
            <Header className='header' />
            <Routes>
                <Route index element={<CoverPage className='coverPage'/>} />
                <Route path='movies' element={<MovieListing movies={movies}/>} />
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
                <Route path='movies/:id' element={<MovieDetails />} />
                <Route path='contacto' element={<Contact />} />
                <Route path='users' element={<UsersGuide users={users} />} />
            </Routes>
            <Footer className='footer'/>
        </div>
    )
}

export default Dashboard
