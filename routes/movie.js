const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post('/', async (req, res) => {

  const { title, plot, image, rating } = req.body;

  const newMovie = new Movie({
    title, plot, image, rating
  });

  try {
    const result = await newMovie.save();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.get('/:movieid', async (req, res) => {
  const { movieid } = req.params;

  const movie = await Movie.findById(movieid);
  res.json(movie);
});

router.patch('/:_id', async (req, res) => {
  const { _id } = req.params;
  const { title, plot, image, rating } = req.body;

  const movie = {
    _id, title, plot, image, rating
  };

  try {
    const result = await Movie.updateOne({ _id }, movie);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.delete('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    const result = await Movie.deleteOne({ _id });
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }

});

module.exports = router;