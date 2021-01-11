const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/movie-rent", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info("Connected to MongoDB..."));
};
