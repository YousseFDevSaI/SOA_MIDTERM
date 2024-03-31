const router = require("express").Router();
const {getUsers, createUser, getUserById, updateUser, deleteUser}= require("../Controllers/userController");

// Create
router.post("/createUser", createUser);


// Read 
router.get("/users", getUsers);

// Read By ID
router.options("/userById", getUserById);

// Update
router.put("/updateUser", updateUser);

// Delete
router.delete("/deleteUser", deleteUser);


router.get("/", (req, res) => {
  res.send("Search for a user");
});
module.exports = router;
