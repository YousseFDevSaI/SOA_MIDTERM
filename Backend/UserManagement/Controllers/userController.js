const User = require("../Models/user");

const getUsers = (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.send(err));
  ;
  };

const getUserById = (req, res) => {
  User.findById(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};

const createUser = async (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    createdAt: req.body.createdAt,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.body.id)
  .then(users => res.json(users))
  .catch(err => res.send(err));
;
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};
  
module.exports = {
  getUsers, createUser, getUserById, deleteUser, updateUser
};
  
