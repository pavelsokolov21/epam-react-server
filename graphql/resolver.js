const Film = require("../models/film");
const { filterFilms } = require("../utils/filterFilms");
const { sortFilms } = require("../utils/sortFilms");
const { sortDescriptors } = require("../utils/sortDescriptors");

module.exports = {
  async films({
    searchBy = "title",
    sortBy = "rating",
    search = "",
  }) {
    try {
      const allFilms = await Film.find();
      let filteredFilms = filterFilms(allFilms, searchBy, search);

      return sortFilms(filteredFilms, sortDescriptors(sortBy));
    } catch (e) {
      throw new Error("Server error!!!");
    }
  },

  async filmsByFilter({
    filter = "",
  }) {
    try {
      const films = await Film.find();
      const filteredFilms = filterFilms(films, "genres", filter);

      return sortFilms(filteredFilms, sortDescriptors("rating"));
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async film({ id }) {
    try {
      const filmById = await Film.findById(id);
      if (filmById === undefined) {
        throw new Error("Can't found film :(");
      }

      return filmById;
    } catch (e) {
      throw new Error("Server error!!!");
    }
  },

}