const { Schema, model } = require("mongoose");

const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true
    }
  ],
  runtime: {
    type: Number,
    required: true,
  },
});

module.exports = model("Film", filmSchema);
