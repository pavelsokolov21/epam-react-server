const sortByRatingDescriptor = (firstFilm, secondFilms) => (
  secondFilms.vote_average - firstFilm.vote_average
);

module.exports = { sortByRatingDescriptor };
