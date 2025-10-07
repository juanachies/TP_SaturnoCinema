import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Reservation = sequelize.define('reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    } 
}, {timestamps:false})

export default Reservation