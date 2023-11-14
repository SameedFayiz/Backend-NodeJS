const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
require("dotenv").config();

// MongoDB connection
mongoose
  .connect(process.env.mongoDb)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => console.log(error));

// Middleware
app.use(morgan("tiny"));
app.use(express.json());

// Main Page
app.get("/", (req, res) => {
  res.send({
    status: 200,
    msg: "API is working fine with nodemon",
  });
});

// Routes
app.use("/users", userRoutes);

app.listen(process.env.port, () => {
  console.log("Server listening on port " + process.env.port);
});
