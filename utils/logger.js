const winston = require("winston");
require("winston-mongodb");

winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/movie-rent",
    level: "error",
  })
);

module.exports = winston.createLogger({
  transports: [new winston.transports.File({ filename: "logfile.log" })],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});
