import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Movies = sequelize.define('movies', {
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
    }
}, {timestamps: false});

export default Movies;