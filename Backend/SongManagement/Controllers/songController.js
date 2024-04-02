const Song = require("../Models/song");

const getSongs = (req, res) => {
    Song.find()
    .then(users => res.json(users))
    .catch(err => res.send(err));
  ;
  };

const getSongById = (req, res) => {
    Song.findById(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};

const createSong = async (req, res) => {
  const song = new Song({
    name: req.body.name,
    genre: req.body.genre,
    addedAt: req.body.createdAt,
  });

  try {
    const savedSong = await song.save();
    res.json(savedSong);
  } catch (err) {
    res.send(err);
  }
};

const updateSong = async (req, res) => {
    try {
      const updatedSong = await Song.findByIdAndUpdate(req.body.id, req.body, { new: true });
      res.json(updatedSong);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

const deleteSong = (req, res) => {
  Song.findByIdAndDelete(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};


  
module.exports = {
  getSongs, createSong, getSongById, deleteSong, updateSong
};
  
