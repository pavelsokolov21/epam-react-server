const fs = require("fs");
const { Router } = require("express");
const router = Router();

const { getPathToData } = require("../utils/getPathToData");
const { filterFilms } = require("../utils/filterFilms");
const { sortFilms } = require("../utils/sortFilms");
const { sortDescriptors } = require("../utils/sortDescriptors");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  try {
    fs.readFile( getPathToData(), "utf-8", (err, filmsData) => {
      if (err) throw err;

      const { 
        searchBy = "title",
        sortBy = "rating",
        search = "" 
      } = req.query;
      const { data } = JSON.parse(filmsData);
      let films;

      if (search.length === 0) {
        films = sortFilms(data, sortDescriptors(sortBy));
      } else {
        const filteredFilms = filterFilms(data, searchBy, search);
        films = sortFilms(filteredFilms, sortDescriptors(sortBy));
      }
      
      res.status(200).json(films);
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  try {
    fs.readFile( getPathToData(), "utf-8", (err, filmsData) => {
      if (err) throw err;

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
