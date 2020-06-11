const path = require("path");

const getPathToData = () => path.join(__dirname, "../database", "films.json");

module.exports = { getPathToData };
