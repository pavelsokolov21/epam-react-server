const Film = require("../models/film");
const { filterFilms } = require("../utils/filterFilms");
const { sortFilms } = require("../utils/sortFilms");
const { sortDescriptors } = require("../utils/sortDescriptors");

module.exports = {
  async getFilms({
    searchBy = "title",
    sortBy = "rating",
    search = "",
    filter = "",
  }) {
    try {
      const allFilms = await Film.find();
      let filteredFilms;

      if (filter.length === 0) {
        filteredFilms = filterFilms(allFilms, searchBy, search);
      } else {
        filteredFilms = filterFilms(allFilms, "genres", filter);
      }
      return sortFilms(filteredFilms, sortDescriptors(sortBy));
    } catch (e) {
      throw new Error("Server error!!!");
    }
  },

  async getFilm({ id }) {
    try {
      const filmById = await Film.findById(id);
      if (filmById === undefined) {
        throw new Error("Can't found film :(");
      }

      return filmById;
    } catch (e) {
      throw new Error("Server error!!!");
    }
  }
}