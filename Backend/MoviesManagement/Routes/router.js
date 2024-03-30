const router = require("express").Router();
const {getMovies, createMovie, getMovieById, updateMovie, deleteMovie}= require("../Controllers/songController");

// Create
router.post('/createSong', createMovie);

// Read 
router.get("/songs", getMovies);

// Read By ID
router.options("/songById", getMovieById);

// Update
router.put("/updateSong", updateMovie);

// Delete
router.delete( "/deleteSong" , deleteMovie);


router.get("/", (req, res) => {
  res.send("Search for a user or a song");
});
module.exports = router;
