const fs = require("fs");
const util = require("util");
const { Router } = require("express");
const router = Router();

const { getPathToData } = require("../utils/getPathToData");
const { filterFilms } = require("../utils/filterFilms");
const { sortFilms } = require("../utils/sortFilms");
const { sortDescriptors } = require("../utils/sortDescriptors");

router.get("/", async (req, res) => {
  try {
    const readFile = util.promisify(fs.readFile);
    await readFile(getPathToData(), "utf-8").then((filmsData) => {
      const { 
        searchBy = "title",
        sortBy = "rating",
        search = "",
        filter = "",
      } = req.query;

      const { data } = JSON.parse(filmsData);
      let filteredFilms;

      if (filter.length === 0) {
        filteredFilms = filterFilms(data, searchBy, search);
      } else {
        filteredFilms = filterFilms(data, searchBy, filter);
      }

      const films = sortFilms(filteredFilms, sortDescriptors(sortBy));
      
      res.status(200).json(films);
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const readFile = util.promisify(fs.readFile);

    await readFile(getPathToData(), "utf-8").then((filmsData) => {
      const id = +req.params.id;
      const { data } = JSON.parse(filmsData);
      const film = data.find((film) => film.id === id);

      if (film === undefined) {
        res.status(404).json({
          message: "Can't found film :("
        });
        return;
      }

      res.status(200).json(film);
    });
  } catch (e) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;
