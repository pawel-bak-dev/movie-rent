const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock,
    dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock,
      dailyRentalRate,
    },
    {
      new: true,
    }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
