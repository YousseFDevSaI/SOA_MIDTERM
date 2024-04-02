const router = require("express").Router();
const {getMovies, createMovie, getMovieById, updateMovie, deleteMovie}= require("../Controllers/movieController");

// Create
router.post('/createMovie', createMovie);

// Read 
router.get("/movies", getMovies);

// Read By ID
router.options("/movieById", getMovieById);

// Update
router.put("/updateMovie", updateMovie);

// Delete
router.delete( "/deleteMovie" , deleteMovie);


router.get("/", (req, res) => {
  res.send("Search for a Movie");
});
module.exports = router;
