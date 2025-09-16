import MovieListing from '../movieListing/MovieListing'
import CoverPage from '../coverPage/CoverPage'


const Dashboard = () => {

    const movies =
        [{
            "Title": "Guardians of the Galaxy Vol. 2",
            "Year": "2017",
            "Rated": "PG-13",
            "Released": "05 May 2017",
            "Runtime": "136 min",
            "Genre": "Action, Adventure, Comedy",
            "Director": "James Gunn",
            "Writer": "James Gunn, Dan Abnett, Andy Lanning",
            "Actors": "Chris Pratt, Zoe Saldaña, Dave Bautista",
            "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
            "Language": "English",
            "Country": "United States",
            "Awards": "Nominated for 1 Oscar. 15 wins & 60 nominations total",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
            "Ratings": [
                {
                "Source": "Internet Movie Database",
                "Value": "7.6/10"
                },
                {
                "Source": "Rotten Tomatoes",
                "Value": "85%"
                },
                {
                "Source": "Metacritic",
                "Value": "67/100"
                }
            ],
            "Metascore": "67",
            "imdbRating": "7.6",
            "imdbVotes": "806,353",
            "imdbID": "tt3896198",
            "Type": "movie",
            "DVD": "N/A",
            "BoxOffice": "$389,813,101",
            "Production": "N/A",
            "Website": "N/A",
            "Response": "True"
        },
        {
            "Title": "Poor Things",
            "Year": "2023",
            "Rated": "R",
            "Released": "22 Dec 2023",
            "Runtime": "141 min",
            "Genre": "Comedy, Drama, Romance",
            "Director": "Yorgos Lanthimos",
            "Writer": "Tony McNamara, Alasdair Gray",
            "Actors": "Emma Stone, Mark Ruffalo, Willem Dafoe",
            "Plot": "An account of the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
            "Language": "English, French, Portuguese",
            "Country": "Ireland, United Kingdom, United States, Hungary",
            "Awards": "Won 4 Oscars. 120 wins & 424 nominations total",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYWU2MjRjZTYtMjVkMS00MTBjLWFiMTAtYmZlYTk1YjkyMWFkXkEyXkFqcGc@._V1_SX300.jpg",
            "Ratings": [
                {
                "Source": "Internet Movie Database",
                "Value": "7.8/10"
                },
                {
                "Source": "Rotten Tomatoes",
                "Value": "92%"
                },
                {
                "Source": "Metacritic",
                "Value": "88/100"
                }
            ],
            "Metascore": "88",
            "imdbRating": "7.8",
            "imdbVotes": "352,566",
            "imdbID": "tt14230458",
            "Type": "movie",
            "DVD": "N/A",
            "BoxOffice": "$34,553,225",
            "Production": "N/A",
            "Website": "N/A",
            "Response": "True"
        }
    ]

    return (
        <div>
            <CoverPage/>
            <MovieListing movies={movies}/>
        </div>
    )
}

export default Dashboard
