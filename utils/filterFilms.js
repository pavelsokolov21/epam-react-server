const { parceToLineStr } = require("./parceToLineStr");

const filterFilms = (films, category, subStr) => {
  if (subStr.length === 1) {
    return films;
  }

  const lowerCaseSubStr = parceToLineStr(subStr);

  return films.filter((film) => {
    let nameOfCategory = "";
    if (Array.isArray(film[category])) {
      nameOfCategory = parceToLineStr(film[category].join(""));
    } else {
      nameOfCategory = parceToLineStr(film[category]);
    }

    return nameOfCategory.includes(lowerCaseSubStr);
  });
};

module.exports = { filterFilms };
