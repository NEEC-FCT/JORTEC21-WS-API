const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  plot: String,
  image: String,
  rating: Number
});

module.exports = mongoose.model('movies', movieSchema);