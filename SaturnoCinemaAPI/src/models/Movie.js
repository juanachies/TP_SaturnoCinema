import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Movie = sequelize.define('movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    runtime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    plot: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    hours: {
        type: DataTypes.JSON,
        allowNull: false, 
    }
}, {timestamps: false});

export default Movie;