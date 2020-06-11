const { sortByDateDescriptor } = require("./sortByDateDescriptor");
const { sortByRatingDescriptor } = require("./sortByRatingDescriptor");

const sortDescriptors = (sortBy) => {
  switch (sortBy) {
    case "rating":
      return sortByRatingDescriptor;
    case "release-date":
      return sortByDateDescriptor;
    default:
      throw new Error("Not found descriptor by sort");
  }
};

module.exports = { sortDescriptors };
