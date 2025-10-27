import User from "./User.js";
import Movie from "./Movie.js";
import Reservation from "./Reservation.js";

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Movie.hasMany(Reservation, { foreignKey: 'movieId' });
Reservation.belongsTo(Movie, { foreignKey: 'movieId' });