const app = require("express");
const router = app.Router();
const UserModal = require("../model/user");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
  } catch (err) {}
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (err) {}
});

router.delete("/:id", async (req, res) => {
  try {
  } catch (err) {}
});

router.put("/:id", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = router;
