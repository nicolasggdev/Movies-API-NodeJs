// Import models
const { User } = require("../model/user.model");
const { Review } = require("../model/review.model");
const { Movie } = require("../model/movie.model");
const { actorsInMovie } = require("../model/actorsInMovie.model");
const { Actor } = require("../model/actor.model");

exports.relationModel = () => {
  // 1 User -> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Movie -> M Reviews
  Movie.hasMany(Review);
  Review.belongsTo(Review);

  // M Movies -> M Actors
  // Movie.hasMany(actorsInMovie);
  // actorsInMovie.belongsToMany(Movie);

  // M Actors -> M Movies
  // Actor.hasMany(actorsInMovie);
  // actorsInMovie.belongsToMany(Actor);
};
