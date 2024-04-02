const express = require("express");
const PORT = 8000;
const app = express();
const cors = require("cors");
const songManagement = require("./SongManagement/Routes/router")
const userManagement = require("./UserManagement/Routes/router")
const movieManagement = require("./MoviesManagement/Routes/router")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/song/", songManagement);
app.use("/user/", userManagement);
app.use("/movie/", movieManagement);


app.listen(PORT, async () => {
       console.log(`server up on port ${PORT}`);
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

mongoose
  .connect(process.env.CONNECTIONSTRING, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
