const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const port = 3000;

// MongoDB connection
mongoose
  .connect("mongodb+srv://admin:admin@mern-app.6nm82vp.mongodb.net/")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => console.log(err));

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

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
