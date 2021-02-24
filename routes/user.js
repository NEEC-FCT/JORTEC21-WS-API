const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

router.post("/", async (req, res) => {

  const { name, email, password } = req.body;

  const duplicate = await User.findOne({ email });

  if (duplicate != null) {
    res.json({ error: "Email already exists" });
    return
  }

  const newUser = new User({
    name, email, password
  });

  const { _id } = await newUser.save();

  const result = { _id, name, email }

  res.json(result)

})

router.get("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    const { _id, name } = user;
    const userWOPass = { _id, email, name };
    const token = jwt.sign(userWOPass, process.env.SECRET, { expiresIn: '15s' });
    res.json({ token });
  } else {
    res.status(401).json({ error: "User or password incorrect" });
  }


});

module.exports = router;