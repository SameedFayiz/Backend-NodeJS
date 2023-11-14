const app = require("express");
const router = app.Router();
const UserModal = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).send({
      status: 200,
      users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, error: true, msg: "Internal server error" });
  }
});

// Get a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.id);
    if (!user) {
      let error = Error("User not found");
      error.code = 401;
      throw error;
    }
    res.status(200).send({ status: 200, user });
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.code || 500, error: error, msg: error.message });
  }
});

// Get a single user by email
router.get("/findByEmail/:email", async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.params.email });
    if (!user) {
      let error = Error("User not found");
      error.code = 401;
      throw error;
    }
    res.status(200).send({ status: 200, user });
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.code || 500, error: error, msg: error.message });
  }
});

//Create a user
router.post("/", async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;

    const user = await UserModal.create({ ...req.body });
    user.password = undefined;
    res.status(200).send({ status: 200, user });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, error: error, msg: "Internal server error" });
  }
});

//Authenticate and login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({ email: email });
    if (!user) {
      throw Error("This email doesn't Exist");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw Error("Password is not valid");
    }
    user.password = undefined;

    // generate token
    const token = jwt.sign({ data: user }, process.env.jwtSecret);

    res.status(200).send({
      status: 200,
      token,
      error: false,
      msg: "User is logged in",
      user,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error, msg: error.message });
  }
});

//Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.id);
    if (!user) {
      throw Error("User Not Found");
    }
    await UserModal.deleteOne({ _id: req.params.id });
    res.status(200).send({ status: 200, msg: "User deleted" });
  } catch (error) {
    res.status(500).send({ status: 500, error: error, msg: error.message });
  }
});

//Update a user
router.put("/:id", async (req, res) => {
  req.body.password = undefined;
  try {
    const user = await UserModal.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!user) {
      throw Error("User Not Found");
    }
    res.status(200).send({ status: 200, user, msg: "User Updated" });
  } catch (error) {
    res.status(500).send({ status: 500, error: error, msg: error.message });
  }
});

module.exports = router;
