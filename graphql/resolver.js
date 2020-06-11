const fs = require("fs");
const util = require("util");

const { getPathToData } = require("../utils/getPathToData");
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
      let sortedFilms;
      const readFile = util.promisify(fs.readFile);
      await readFile(getPathToData(), "utf-8").then((filmsData) => {
        const { data } = JSON.parse(filmsData);
        let filteredFilms;
        if (filter.length === 0) {
          filteredFilms = filterFilms(data, searchBy, search);
        } else {
          filteredFilms = filterFilms(data, "genres", filter);
        }

        sortedFilms = sortFilms(filteredFilms, sortDescriptors(sortBy));
      });
      
      return sortedFilms;
    } catch (e) {
      throw new Error("Server error!!!");
    }
  },

  async getFilm({ id }) {
    try {
      const readFile = util.promisify(fs.readFile);
      let film;
      await readFile(getPathToData(), "utf-8").then((filmsData) => {
        const { data } = JSON.parse(filmsData);
        film = data.find((film) => film.id === +id);

        if (film === undefined) {
          throw new Error("Can't found film :(");
        }
      });
      
      return film;
    } catch (e) {
      throw new Error("Server error!!!");
    }
  }
}