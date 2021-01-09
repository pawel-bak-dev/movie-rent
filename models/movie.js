const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    genre: genreSchema,
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
    },
  })
);

function validate(movie) {
  const schema = Joi.object({
    title: Joi.boolean(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validate;
