// Import models
const { User } = require("../model/user.model");
const { Review } = require("../model/review.model");
const { Movie } = require("../model/movie.model");
const { ActorsInMovie } = require("../model/actorsInMovie.model");
const { Actor } = require("../model/actor.model");

exports.relationModel = () => {
  // 1 User -> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Movie -> M Reviews
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  // M Movies -> M Actors
  Movie.belongsToMany(Actor, { through: ActorsInMovie });
  Actor.belongsToMany(Movie, { through: ActorsInMovie });
};
