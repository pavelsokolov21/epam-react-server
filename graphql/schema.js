const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Film {
    id: String!
    title: String!
    tagline: String!
    vote_average: Float!
    vote_count: Int!
    release_date: String!
    poster_path: String!
    overview: String!
    budget: Int!
    revenue: Int!
    genres: [String!]!
    runtime: Int!
  }

  type Query {
    getFilms(
      searchBy: String
      sortBy: String
      search: String
      filter: String
    ): [Film!]!
    getFilm(id: ID!): Film!
  }
`);