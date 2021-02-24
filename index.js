require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

//Routes
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movie');

app.use("/user", userRoute);
app.use("/movie", verifyAuth, movieRoute);

app.get("/", (req, res) => {
  res.send("Olá");
})

mongoose.connect("mongodb://localhost:27017/api", { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => {
  console.log("Servidor aberto na porta " + process.env.PORT);
});


function verifyAuth(req, res, next) {

  const token = req.headers['token'];
  if (!token) {
    res.status(401).json({ error: "Invalid token" });
    return
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
      return
    } else {
      req.user = user;
      next();
    }
  });
}