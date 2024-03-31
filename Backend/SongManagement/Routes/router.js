const router = require("express").Router();
const {getSongs, createSong, getSongById, updateSong, deleteSong}= require("../Controllers/songController");

// Create
router.post('/createSong', createSong);

// Read 
router.get("/songs", getSongs);

// Read By ID
router.options("/songById", getSongById);

// Update
router.put("/updateSong", updateSong);

// Delete
router.delete( "/deleteSong" , deleteSong);


router.get("/", (req, res) => {
  res.send("Search for a user or a song");
});
module.exports = router;
