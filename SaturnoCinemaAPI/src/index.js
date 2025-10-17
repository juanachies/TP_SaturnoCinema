import { PORT } from "./config.js";
import express from 'express';
import movieRoutes from './routes/movie.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'
import { sequelize } from "./db.js";

const app = express()

try{
    app.use(express.json());

    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
    })

    app.use(movieRoutes)
    app.use(authRoutes)
    app.use(contactRoutes)
    app.listen(PORT)
    
    await sequelize.sync();

    console.log(`Server listening on port ${PORT}`)

} catch (error){
    console.log('There was an error on initialization:', error)
}
