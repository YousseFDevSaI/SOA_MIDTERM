const Movie = require("../Models/movie");

const getMovies = (req, res) => {
  Movie.find()
    .then(users => res.json(users))
    .catch(err => res.send(err));
  ;
  };

const getMovieById = (req, res) => {
  Movie.findById(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};

const createMovie = async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    addedAt: req.body.createdAt,
    year: req.body.year,
    actors: req.body.actors
  });

  try {
    const savedMovie = await movie.save();
    res.json(savedMovie);
  } catch (err) {
    res.send(err);
  }
};

const updateMovie = async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.body.id, req.body, { new: true });
      res.json(updatedMovie);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

const deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};


  
module.exports = {
  getMovies, createMovie, getMovieById, deleteMovie, updateMovie
};
  
