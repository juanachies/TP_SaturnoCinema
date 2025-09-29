import lupa from '../../img/lupa.png'
import './movieSearch.css'

const MovieSearch = ({onSearch}) => {

    const handleSearch = (movieName) => {
        onSearch(movieName.target.value)
    }

    return (
        <div className='search'>
            <img src={lupa} alt="" className='search-icon'/>
            <input className='search-input'
                type="text"
                placeholder='Buscar películas...' 
                onChange={handleSearch}
            />
        </div>
    )
}

export default MovieSearch