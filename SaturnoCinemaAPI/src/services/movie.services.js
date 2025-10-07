import Movies from "../models/Movies";

export const findMovies = async (req, res) => {
    const movies = await Movies.findAll();
    res.json(movies)
}


export const findMovie = async (req, res) => {
    const {id} = req.params;
    const movie = await Movies.findByPk(id);

    if (!movie)
        return res.status(404).send({message: 'Movie not found'});

    res.json(book)
}


export const createMovie = async(req, res) => {
    const {title, director, year, genre, runtime, rating, imageUrl, plot} = req.body;

    if (!title)
        return res.status(400).send({message: 'Title field is required'})

    const newMovie = await Movies.create({
        title, 
        director, 
        year, 
        genre, 
        runtime, 
        rating, 
        imageUrl, 
        plot
    })

    res.json(newMovie)
}


export const updateMovie = async (req, res) => {
    const {id} = req.params;
    const {title, director, year, genre, runtime, rating, imageUrl, plot} = req.body;

    const movie = await Movies.findByPk(id);

    if (!movie)
        return res.status(404).send({message: 'Movie not found'})

    await movie.update({
        title, 
        director, 
        year, 
        genre, 
        runtime, 
        rating, 
        imageUrl, 
        plot
    })

    await movie.save();

    res.json(movie)
}


export const deleteMovie = async(req,res) => {
    const {id} = req.params;
    const movie = await Movies.findByPk(id);

    if (!movie) 
        return res.status(404).send({message: 'Movie not found'})

    await movie.destroy()

    res.send(`Movie with id: ${id} deleted`)
}